from PyQt5.QtWidgets import (
    QApplication, QMainWindow, QTabWidget, QWidget, QVBoxLayout,
    QSizePolicy, QLineEdit, QComboBox, QAbstractItemView
)
from PyQt5.QtCore import QObject, QEvent, Qt, QTimer
from configPanel import ConfigPanel
from header import Header
from body import Body
from footer import Footer


class GlobalKeyHandler(QObject):
    def __init__(self, footer, header, config_panel):
        super().__init__()
        self.footer = footer
        self.header = header
        self.config_panel = config_panel

        # Mapping keys to vehicle codes
        self.key_map = {
            Qt.Key_0: "0", Qt.Key_1: "1", Qt.Key_2: "2", Qt.Key_3: "3",
            Qt.Key_4: "4", Qt.Key_5: "5", Qt.Key_6: "6", Qt.Key_7: "7",
            Qt.Key_8: "8", Qt.Key_9: "9",
            Qt.Key_H: "h", Qt.Key_M: "m", Qt.Key_O: "o", Qt.Key_R: "r",
            Qt.Key_C: "c", Qt.Key_Z: "z", Qt.Key_A: "a", Qt.Key_V: "v",
        }

    def eventFilter(self, obj, event):
        if event.type() == QEvent.KeyPress:
            focused_widget = QApplication.focusWidget()
            key = event.key()
            key_text = event.text().lower()

            # Dynamically skip if typing in input fields
            if isinstance(focused_widget, (QLineEdit, QComboBox, QAbstractItemView)):
                return False

            if key in self.key_map:
                vehicle_code = self.key_map[key]
                self.footer.vehicle_no_input.setText(vehicle_code.upper())
                QTimer.singleShot(0, lambda: self.footer.vehicle_name_combo.setFocus())
                return True

        return False


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Vehicle Logger App")
        self.showMaximized()

        self.tabs = QTabWidget()
        self.tabs.currentChanged.connect(self.on_tab_changed)


        # Configuration Tab
        self.config_tab = ConfigPanel(self.switch_to_data_tab)
        self.tabs.addTab(self.config_tab, "Configuration")

        # Data Tab
        self.data_tab = QWidget()
        data_layout = QVBoxLayout()

        self.footer = Footer(
            play_toggle_func=None,
            seek_forward_func=None,
            seek_backward_func=None,
            increase_speed_func=None,
            decrease_speed_func=None,
            header=None,
            add_row=None,
            body=None
        )

        self.header = Header(self.footer, config_data={})
        self.footer.header = self.header

        self.body_panel = Body({}, self.header)
        self.body_panel.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)

        self.footer.add_row = self.body_panel.add_row
        self.footer.body = self.body_panel

        data_layout.addWidget(self.header)
        data_layout.addWidget(self.body_panel)
        data_layout.addWidget(self.footer)

        self.data_tab.setLayout(data_layout)
        self.tabs.addTab(self.data_tab, "Data")

        self.setCentralWidget(self.tabs)
        # ✅ Install Global Key Handler
        self.key_filter = GlobalKeyHandler(self.footer, self.header, self.config_tab)

        self.switch_to_data_tab

    def switch_to_data_tab(self, config_data):
        self.body_panel.update_config(config_data)
        self.header.update_config(config_data)
        self.tabs.setCurrentIndex(1)

        # ✅ Ensure keyboard focus leaves all input fields
        self.body_panel.setFocus()

    def on_tab_changed(self, index):
        if index == 1:  # User moved to "Data" tab
            config_data = self.config_tab.get_config_data()
            self.switch_to_data_tab(config_data)



if __name__ == "__main__":
    import sys
    app = QApplication(sys.argv)
    window = MainWindow()
    app.installEventFilter(window.key_filter)
    window.show()
    sys.exit(app.exec_())
