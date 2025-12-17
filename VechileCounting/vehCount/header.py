from PyQt5.QtWidgets import (
    QWidget, QLabel, QHBoxLayout, QPushButton, QComboBox,
    QCheckBox, QLineEdit, QSpacerItem, QSizePolicy, QApplication
)
from PyQt5.QtCore import Qt

from PyQt5.QtCore import QRegularExpression
from PyQt5.QtGui import QRegularExpressionValidator
from PyQt5.QtGui import QIntValidator

import re


class BufferInput(QLineEdit):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setValidator(QIntValidator(0, 9999))
        self.setPlaceholderText("Buffer (sec)")
        self.setFixedWidth(30)
    
    def keyPressEvent(self, event):
        value = int(self.text() or 0)
        if event.key() in (Qt.Key_Plus, Qt.Key_Equal):
            self.setText(str(value + 1))
            self.parent().update_timestamp_with_buffer()
        elif event.key() == Qt.Key_Minus:
            if value > 0:
                self.setText(str(value - 1))
                self.parent().update_timestamp_with_buffer()
        else:
            super().keyPressEvent(event)


class Header(QWidget):
    def __init__(self, footer, config_data=None):  # Accept footer as a parameter
        super().__init__()
        self.footer = footer  # Store footer reference

        self.config_data = config_data or {}
        layout = QHBoxLayout()
        layout.setContentsMargins(10, 0, 10, 0)
        layout.setSpacing(0) 


        # --- Delete All Button (Left) ---
        self.delete_btn = QPushButton("Delete All")
        self.delete_btn.setFocusPolicy(Qt.NoFocus)
        self.delete_btn.setObjectName("deleteBtn")

        # --- Save Type, Save, Save As (Center) ---
        self.save_type = QComboBox()
        self.save_type.addItems(["CSV", "Excel"])
        self.save_type.setFocusPolicy(Qt.ClickFocus)
        self.save_type.setObjectName("saveType")

        self.save_btn = QPushButton("Save")
        self.save_btn.setFocusPolicy(Qt.NoFocus)
        self.save_btn.setObjectName("saveBtn")

        self.save_as_btn = QPushButton("Save As")
        self.save_as_btn.setFocusPolicy(Qt.NoFocus)
        self.save_as_btn.setObjectName("saveAsBtn")

        # --- DIR + Timestamp (Right) ---
        self.dir_checkbox = QCheckBox("DIR")
        self.dir_checkbox.setFocusPolicy(Qt.ClickFocus)
        self.dir_checkbox.setObjectName("dirCheck")
        self.dir_checkbox.toggled.connect(self.toggle_dir_input)

        self.dir_input = QComboBox()
        self.dir_input.addItems(["1", "2"])
        self.dir_input.setFixedWidth(40)
        self.dir_input.setFocusPolicy(Qt.ClickFocus)
        self.dir_input.setObjectName("dirInput")

        # --- Styling ---
        self.setStyleSheet("""
            * {
                font-family: 'Segoe UI', 'Sans-serif';
                font-size: 16px;
                font-weight: bold;
            }

            QPushButton#deleteBtn {
                background-color: #d9534f;
                color: white;
                font-weight: bold;
                padding: 6px 12px;
                border-radius: 5px;
            }
            QPushButton#deleteBtn:hover {
                background-color: #c9302c;
            }

            QPushButton#saveBtn, QPushButton#saveAsBtn {
                background-color: #007bff;
                color: white;
                font-weight: bold;
                padding: 6px 12px;
                border-radius: 5px;
                margin: 0 8px;
            }
            QPushButton#saveBtn:hover, QPushButton#saveAsBtn:hover {
                background-color: #0056b3;
            }

            QComboBox#saveType, QComboBox#dirInput {
                background-color: #ffffff;
                border: 1px solid #ccc;
                border-radius: 4px;
                padding: 4px;
            }

            QLineEdit#dirInput {
                height: 28px;
                border: 1px solid #444;
                border-radius: 4px;
                padding: 4px 6px;
                background-color: #fafafa;
                margin: 0 20px;
            }

            QLineEdit#dirInput:focus {
                border: 2px solid #007ACC;
                background-color: #f0f8ff;
            }

            QCheckBox#dirCheck {
                font-size: 18px;
                spacing: 8px;
            }

            QCheckBox#dirCheck::indicator {
                width: 22px;
                height: 22px;
            }
        """)

        self.timestamps_input = QLineEdit("00:00:00")
        pattern = r"^([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$"
        reg_exp = QRegularExpression(pattern)
        validator = QRegularExpressionValidator(reg_exp, self.timestamps_input)
        self.timestamps_input.setValidator(validator)
        self.timestamps_input.setFocusPolicy(Qt.ClickFocus)  # Only clickable, not tab-focusable
        self.timestamps_input.setFixedWidth(120)
        self.timestamps_input.setStyleSheet("""
            QLineEdit {
                padding: 4px;
                border: 1px solid #ccc;
                border-radius: 3px;
                font-size: 16px;
            }
            QLineEdit:focus {
                border: 2px solid #007ACC;
                background-color: #f0f8ff;
            }
        """)

        self.buffer_input = BufferInput(self)
        self.buffer_input.setFocusPolicy(Qt.ClickFocus)
        self.buffer_input.installEventFilter(self)


        # --- Layout Assembly ---
        layout.addWidget(self.delete_btn)

        layout.addSpacerItem(QSpacerItem(40, 5, QSizePolicy.Expanding, QSizePolicy.Minimum))

        layout.addWidget(QLabel("Save Type:"))
        layout.addWidget(self.save_type)
        layout.addWidget(self.save_btn)
        layout.addWidget(self.save_as_btn)

        layout.addSpacerItem(QSpacerItem(40, 5, QSizePolicy.Expanding, QSizePolicy.Minimum))

        layout.addWidget(self.dir_checkbox)
        layout.addWidget(self.dir_input)

        layout.addWidget(QLabel("Buffer:"))
        layout.addWidget(self.buffer_input)

        layout.addWidget(QLabel("Timestamp:"))
        layout.addWidget(self.timestamps_input)

        self.setLayout(layout)
        self.setContentsMargins(0, 0, 0, 0)

    def update_config(self, config_data):
        self.config_data = config_data
        video_path = self.config_data.get("video_path")
        filename = video_path.split("/")[-1]
        self.extract_timestamp_from_filename(filename)


    def toggle_dir_input(self, checked):
        """Hide or show the DIR input based on checkbox state."""
        self.footer.update_footer_dir_visibility(not checked)  # Use reference instead of self.parent()


    def extract_timestamp_from_filename(self, filename):
        """
        Extract date and time from the filename. The format is expected to be:
        YYYYMMDDHHMMSS (e.g., 20240603120000)
        """
        match = re.match(r'(\d{8})(\d{6})', filename)  # Only one timestamp (YYYYMMDDHHMMSS)
        if match:
            start_date = match.group(1)  # First 8 digits: YYYYMMDD
            start_time = match.group(2)  # Next 6 digits: HHMMSS
            
            # Extract year, day, and month
            year = start_date[:4]
            day = start_date[4:6]
            month = start_date[6:]
            
            # Convert start date and time to the correct format
            formatted_date = f"{year}-{day}-{month}"  # YYYY-DD-MM
            formatted_time = f"{start_time[:2]}:{start_time[2:4]}:{start_time[4:]}"  # HH:MM:SS

            self.timestamps_input.setText(formatted_time if formatted_time else "00:00:00")

            self.video_timeStamps_value = formatted_time
            self.video_date = formatted_date
            
            return formatted_date, formatted_time
        return None, None
    
    def update_timestamp_with_buffer(self):
        original_time = self.timestamps_input.text()
        buffer_val = int(self.buffer_input.text() or 0)

        if buffer_val == 0:
            return  # Nothing to update

        # Convert original_time HH:MM:SS to seconds
        h, m, s = map(int, original_time.split(":"))
        total_seconds = h * 3600 + m * 60 + s + buffer_val

        # Wrap around 24-hour clock
        total_seconds %= 86400  # 24 * 3600

        # Convert back to HH:MM:SS
        h = total_seconds // 3600
        m = (total_seconds % 3600) // 60
        s = total_seconds % 60

        new_time = f"{h:02}:{m:02}:{s:02}"
        self.timestamps_input.setText(new_time)
    

    def eventFilter(self, obj, event):
        if obj == self.buffer_input and event.type() == event.KeyPress:
            key = event.key()
            value = int(self.buffer_input.text() or 0)
            if key in (Qt.Key_Plus, Qt.Key_Equal):
                self.buffer_input.setText(str(value + 1))
                self.update_timestamp_with_buffer()
                return True  # Event handled
            elif key == Qt.Key_Minus:
                if value > 0:
                    self.buffer_input.setText(str(value - 1))
                    self.update_timestamp_with_buffer()
                return True
        return super().eventFilter(obj, event)


