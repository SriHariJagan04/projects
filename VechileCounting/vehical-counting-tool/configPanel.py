import os
import subprocess
import traceback
from PyQt5.QtWidgets import (
    QWidget, QVBoxLayout, QFormLayout, QLineEdit, QDateEdit,
    QPushButton, QFileDialog, QHBoxLayout, QLabel, QSpacerItem,
    QSizePolicy, QMessageBox
)

from PyQt5.QtCore import QThread, pyqtSignal, Qt, QDate


import subprocess
import os
from PyQt5.QtCore import QThread, pyqtSignal

class VideoCompressor(QThread):
    finished = pyqtSignal(bool, str)

    def __init__(self, input_path, output_path):
        super().__init__()
        self.input_path = input_path
        self.output_path = output_path

    def run(self):
        try:
            cmd = [
                "ffmpeg", "-i", self.input_path,
                "-vf", "scale=iw/2:ih/2",
                "-c:v", "libx264",
                "-preset", "ultrafast",
                "-crf", "28",               # Less aggressive compression
                "-r", "18",
                "-vsync", "cfr",
                "-y", self.output_path
            ]

            # Hide CMD window on Windows
            startupinfo = None
            if os.name == "nt":
                startupinfo = subprocess.STARTUPINFO()
                startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW

            subprocess.run(
                cmd,
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                startupinfo=startupinfo
            )

            self.finished.emit(True, self.output_path)
        except subprocess.CalledProcessError:
            self.finished.emit(False, "")







class ConfigPanel(QWidget):
    def __init__(self, on_next):
        super().__init__()
        self.on_next_callback = on_next
        self.original_video_path = ""
        self.compressed_video_path = ""

        main_layout = QVBoxLayout()
        main_layout.setAlignment(Qt.AlignCenter)

        form_widget = QWidget()
        form_layout = QFormLayout()
        form_widget.setLayout(form_layout)

        form_widget.setStyleSheet("""
            * {
                font-family: 'Segoe UI', 'Sans-serif';
                font-size: 18px;
            }
            QLineEdit, QDateEdit {
                min-width: 250px;
                height: 32px;
                padding: 6px;
                border: 1px solid black;
                border-radius: 4px;
                background-color: white;
                font-weight: 500;
                font-size: 18px;
            }
            QLineEdit:focus, QDateEdit:focus {
                border: 2px solid #007ACC;
                background-color: #f0f8ff;
            }
            QPushButton#uploadBtn {
                height: 45px;
                background-color: #e0e0e0;
                color: black;
                font-weight: 500;
                border: 1px solid black;
                border-radius: 4px;
            }
            QPushButton#uploadBtn:hover {
                background-color: #d0d0d0;
            }
            QPushButton#nextBtn {
                height: 45px;
                background-color: #007ACC;
                color: white;
                font-weight: 500;
                border: 1px solid black;
                border-radius: 4px;
            }
            QPushButton#nextBtn:hover {
                background-color: #005A9E;
            }
            QLabel {
                font-weight: 500;
                margin-bottom: 4px;
            }
        """)

        self.date_input = QDateEdit()
        self.date_input.setCalendarPopup(True)
        self.date_input.setDate(QDate.currentDate())

        self.lon_input = QLineEdit()
        self.lat_input = QLineEdit()

        self.dir_left_input = QLineEdit("1")
        self.dir_right_input = QLineEdit("2")
        self.dir_left_input.setMaxLength(2)
        self.dir_right_input.setMaxLength(2)
        self.dir_left_input.setFixedWidth(50)
        self.dir_right_input.setFixedWidth(50)

        dir_widget = QWidget()
        dir_layout = QHBoxLayout()
        dir_layout.setContentsMargins(0, 0, 0, 0)
        dir_widget.setLayout(dir_layout)
        dir_layout.addWidget(QLabel("Direction '<':"))
        dir_layout.addWidget(self.dir_left_input)
        dir_layout.addSpacing(20)
        dir_layout.addWidget(QLabel("Direction '>':"))
        dir_layout.addWidget(self.dir_right_input)

        self.video_path = QLineEdit()
        self.video_path.setReadOnly(True)
        upload_btn = QPushButton("Upload Video")
        upload_btn.setObjectName("uploadBtn")
        upload_btn.clicked.connect(self.upload_video)

        self.next_btn = QPushButton("Next")
        self.next_btn.setObjectName("nextBtn")
        self.next_btn.setEnabled(False)
        self.next_btn.clicked.connect(self.handle_next)

        form_layout.addRow("Date:", self.date_input)
        form_layout.addRow("Longitude:", self.lon_input)
        form_layout.addRow("Latitude:", self.lat_input)
        form_layout.addRow("Direction Values:", dir_widget)
        form_layout.addRow("Video Path:", self.video_path)
        form_layout.addRow(upload_btn)
        form_layout.addRow(self.next_btn)

        main_layout.addSpacerItem(QSpacerItem(20, 40, QSizePolicy.Minimum, QSizePolicy.Expanding))
        main_layout.addWidget(form_widget, alignment=Qt.AlignCenter)
        main_layout.addSpacerItem(QSpacerItem(20, 40, QSizePolicy.Minimum, QSizePolicy.Expanding))

        self.setLayout(main_layout)



    def upload_video(self):
        file, _ = QFileDialog.getOpenFileName(
            self, "Select Video", "", "Video Files (*.mp4 *.avi *.mkv)"
        )
        if file:
            self.original_video_path = file
            file_size_mb = os.path.getsize(file) / (1024 * 1024)

            if file_size_mb <= 120:
                # No compression needed
                self.compressed_video_path = ""
                self.video_path.setText(file)
                self.next_btn.setText("Next")
                self.next_btn.setEnabled(True)
            else:
                # Compress since it's larger than 30 MB
                base_dir = os.path.dirname(file)
                base_name = os.path.splitext(os.path.basename(file))[0]
                self.compressed_video_path = os.path.join(base_dir, f"{base_name}_compressed_temp.mp4")

                self.video_path.setText("Compressing video...")
                self.next_btn.setText("Compressing...")
                self.next_btn.setEnabled(False)

                self.compressor_thread = VideoCompressor(file, self.compressed_video_path)
                self.compressor_thread.finished.connect(self.on_compression_finished)
                self.compressor_thread.start()



    def on_compression_finished(self, success, output_path):
        if success:
            self.video_path.setText(output_path)
            self.next_btn.setText("Next")
            self.next_btn.setEnabled(True)
        else:
            self.video_path.setText("")
            self.next_btn.setText("Next")
            self.next_btn.setEnabled(False)
            QMessageBox.critical(self, "Compression Failed", "Video compression failed.")

    def handle_next(self):
        if not self.video_path.text():
            self.show_warning()
            return
        config_data = self.get_config_data()
        self.on_next_callback(config_data)

    def get_config_data(self):
        return {
            "date": self.date_input.date(),
            "longitude": self.lon_input.text(),
            "latitude": self.lat_input.text(),
            "dir_left": self.dir_left_input.text(),
            "dir_right": self.dir_right_input.text(),
            "video_path": self.compressed_video_path or self.original_video_path
        }

    def show_warning(self):
        msg = QMessageBox()
        msg.setIcon(QMessageBox.Warning)
        msg.setWindowTitle("Warning")
        msg.setText("Please upload a video before proceeding.")
        msg.exec_()
