import sys
import os
import json
import uuid
import base64
import hashlib
from datetime import datetime, timedelta

from PyQt5.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QLabel,
    QLineEdit, QPushButton, QMessageBox
)

from cryptography.fernet import Fernet

# -------------------------------
# CONFIGURATION
# -------------------------------
LICENSE_FILE = "license.enc" #Leave as-is unless you want to change the file name or location where the encrypted license is stored
SECRET = "my-secret-salt"   # Must be replaced with a private secret string known only to you
ENCRYPTION_KEY = base64.urlsafe_b64encode(hashlib.sha256(b"encryption-password").digest())

# -------------------------------
# LICENSE CORE FUNCTIONS
# -------------------------------
def get_machine_code():
    mac = uuid.getnode()
    return ':'.join(['{:02x}'.format((mac >> ele) & 0xff)
                    for ele in range(0, 8 * 6, 8)][::-1])

def generate_product_key(machine_code: str, secret: str = SECRET):
    data = f"{machine_code}-{secret}"
    hashed = hashlib.sha256(data.encode()).digest()
    return base64.urlsafe_b64encode(hashed[:16]).decode("utf-8")

def encrypt_license(data: dict) -> None:
    f = Fernet(ENCRYPTION_KEY)
    payload = json.dumps(data).encode()
    token = f.encrypt(payload)
    with open(LICENSE_FILE, "wb") as f_out:
        f_out.write(token)

def decrypt_license() -> dict:
    if not os.path.exists(LICENSE_FILE):
        return {}
    try:
        f = Fernet(ENCRYPTION_KEY)
        with open(LICENSE_FILE, "rb") as f_in:
            token = f_in.read()
        data = f.decrypt(token)
        return json.loads(data.decode())
    except Exception:
        return {}

def is_license_valid() -> (bool, str):
    data = decrypt_license()
    if not data:
        return False, "No valid license file found."

    try:
        machine = get_machine_code()
        expected_key = generate_product_key(machine)
        if data.get("key") != expected_key:
            return False, "License key is not valid for this machine."

        expiry = datetime.strptime(data.get("expiry"), "%Y-%m-%d")
        if datetime.now() > expiry:
            return False, "License has expired. Please renew."
        return True, "License is valid."
    except Exception as e:
        return False, f"License check failed: {str(e)}"

def activate_license(input_key: str) -> (bool, str):
    machine = get_machine_code()
    expected_key = generate_product_key(machine)
    if input_key != expected_key:
        return False, "Invalid license key for this machine."

    expiry = datetime.now() + timedelta(days=30)
    data = {"key": input_key, "expiry": expiry.strftime("%Y-%m-%d")}
    encrypt_license(data)
    return True, f"License activated until {expiry.date()}"

# -------------------------------
# PYQT INTERFACE
# -------------------------------
class LicenseWindow(QWidget):
    def __init__(self, on_success_callback):
        super().__init__()
        self.on_success_callback = on_success_callback
        self.setWindowTitle("Activate License")
        self.setGeometry(100, 100, 320, 180)

        layout = QVBoxLayout()
        self.label = QLabel("Enter your license key:")
        self.input = QLineEdit()
        self.btn_activate = QPushButton("Activate")
        self.btn_machine = QPushButton("Get Machine Code")

        layout.addWidget(self.label)
        layout.addWidget(self.input)
        layout.addWidget(self.btn_activate)
        layout.addWidget(self.btn_machine)
        self.setLayout(layout)

        self.btn_activate.clicked.connect(self.activate)
        self.btn_machine.clicked.connect(self.show_machine_code)

    def activate(self):
        key = self.input.text().strip()
        success, message = activate_license(key)
        QMessageBox.information(self, "Activation", message)
        if success:
            self.close()
            self.on_success_callback()

    def show_machine_code(self):
        code = get_machine_code()
        QMessageBox.information(self, "Machine Code", f"Send this code to admin:\n\n{code}")




# class MainApp(QWidget):
#     def __init__(self):
#         super().__init__()
#         self.setWindowTitle("Licensed Application")
#         self.setGeometry(100, 100, 300, 100)
#         layout = QVBoxLayout()
#         label = QLabel("Welcome! License is valid.")
#         layout.addWidget(label)
#         self.setLayout(layout)




#--------------------------- Added Code-----------------------------------------------
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app import MainWindow
#------------------------------------------------------------------------------------




# -------------------------------
# MAIN LOGIC
# -------------------------------
def run_app():
    app = QApplication(sys.argv)
    valid, msg = is_license_valid()

    if valid:
        window = MainWindow()
        window.show()
    else:
        QMessageBox.warning(None, "License Required", msg)
        window = LicenseWindow(on_success_callback=lambda: MainWindow().show())
        window.show()

    sys.exit(app.exec_())

if __name__ == "__main__":
    run_app()



# 6DhvkA1ByusAvwfR9bBmXQ==