from PyQt5.QtWidgets import (
    QWidget, QHBoxLayout, QVBoxLayout, QLineEdit, QComboBox,
    QPushButton, QLabel, QSpacerItem, QSizePolicy, QFrame,
)
from PyQt5.QtGui import QRegExpValidator, QIntValidator
from PyQt5.QtCore import QRegExp, Qt, QEvent, QTimer
from PyQt5 import QtCore


class PopupEventFilter(QtCore.QObject):
    def __init__(self, combo, dir_input, axle_vale, add_btn):
        super().__init__()
        self.combo = combo
        self.dir_input = dir_input
        self.axle_vale = axle_vale
        self.add_btn = add_btn


    def eventFilter(self, obj, event):
        if event.type() == QtCore.QEvent.KeyPress:
            key = event.key()
            if key in [Qt.Key_1, Qt.Key_2, Qt.Key_3, Qt.Key_4]:
                index = key - Qt.Key_1
                if index < self.combo.count():
                    self.combo.setCurrentIndex(index)
                    self.combo.activated.emit(index)
                    self.combo.hidePopup()
                    # Set focus here if needed
                    if self.dir_input.isVisible():
                        QTimer.singleShot(0, lambda: self.dir_input.setFocus())
                    elif self.axle_vale.isVisible():
                        QTimer.singleShot(0, lambda: self.axle_vale.setFocus())
                    else:
                        QTimer.singleShot(0, lambda: self.add_btn.setFocus())
                    return True
                    
                return True
        return super().eventFilter(obj, event)


class Footer(QWidget):
    def __init__(self, media_player, play_toggle_func, seek_forward_func,
                 seek_backward_func, increase_speed_func, decrease_speed_func, header, add_row, body):
        super().__init__()

        self.direction_value = None

        self.media_player = media_player
        self.toggle_play = play_toggle_func
        self.seek_forward = seek_forward_func
        self.seek_backward = seek_backward_func
        self.increase_speed = increase_speed_func
        self.decrease_speed = decrease_speed_func
        self.add_row = add_row

        self.body = body

        self.header = header  # Pass reference of the Header widget
        # self.body = body

        self.vehicle_mapping = {
            '1': ['Bicycle'], '2': ['2 Wheeler'],
            '3': ['3 Wheeler Passenger', '3 Wheeler Goods'],
            '4': ['Tractor'], '5': ['Tractor with Trailer'],
            '6': ['SCV', 'Taxi', 'Shared Passenger'],
            '7': ['Light Motor Vechile'],
            '8': ['LCV (4W)', 'LCV (6W)', 'Mini Bus'],
            '9': ['2 Axle Truck (MCV)', '2 Axle Bus (MCV)'],
            'h': ['3 Axle Truck (HCV)', '3 Axle Bus (HCV)'],
            'H': ['3 Axle Truck (HCV)', '3 Axle Bus (HCV)'],
            'm': ['MAV'], 'M': ['MAV'],
            'o': ['OSV'], 'O': ['OSV'],
            'r': ['Ricks'], 'R': ['Ricks'],
            'c': ['Cons'], 'C': ['Cons'],
            '0': ['OSM', 'OFM'],
            'z': ['Animal', 'Hand Drawn'],  
            'Z': ['Animal', 'Hand Drawn'],
            'a':['Ambulance Car', 'Ambulance Bus', 'Police Bus', 'Army Truck'],
            'A':['Ambulance Car', 'Ambulance Bus', 'Police Bus', 'Army Truck'],
            "v": ['Private Bus', 'State Bus', "School Bus"], 
            "V": ['Private Bus', 'State Bus', "School Bus"],

        }
        #           wb   axle   class
        self.vehicle_map = {
            "h": ("3.5", "3", "10"),
            "m": ("4.5", "5", "11"),
            "o": ("4.0", "4", "12"),
            "r": ("2.0", "3", "13"),
            "c": ("3.0", "2", "14"),
            'a': ("0", "2", "16"),
            "0": ('0', '2', '17'),
            "z": ("0", "2", "18"),
            'v': ("0", "0", "19"),
            "1": ("1.0", "2", "1"),
            "2": ("1.2", "2", "2"),
            "3": ("1.5", "2", "3"),
            "4": ("3.0", "2", "4"),
            "5": ("5.0", "3", "5"),
            "6": ("2.0", "2", "6"),
            "7": ("2.2", "2", "7"),
            "8": ("2.5", "2", "8"),
            "9": ("3.0", "3", "9"),
        }


        self.init_ui()

    def init_ui(self):
        def make_label(text):
            label = QLabel(text)
            label.setStyleSheet("font-weight: bold; font-size: 12px; margin-right: 20px;")
            return label

        def wrap_in_box(widget, width):
            frame = QFrame()
            frame.setFixedWidth(width)
            layout = QVBoxLayout()
            layout.setContentsMargins(0, 0, 0, 0)
            layout.setSpacing(0)
            layout.addWidget(widget)
            frame.setLayout(layout)
            return frame

        self.setStyleSheet("""
            QLineEdit, QComboBox {
                border: 1px solid black;
                border-radius: 6px;
                padding: 4px 6px;
                font-size: 13px;
             
            }
            QLineEdit:focus, QComboBox:focus {
                border: 2px solid black;
                background-color: #f0faff;
            }
            QPushButton:focus {
                border: 2px solid orange;
            }
        """)

        layout = QVBoxLayout(self)
        layout.setSpacing(0)
        layout.setContentsMargins(0, 0, 0, 0) 

        # --- Label Row --- 
        label_row = QHBoxLayout()
        label_row.addWidget(make_label("Vehicle No:"))
        label_row.addSpacerItem(QSpacerItem(40, 0, QSizePolicy.Fixed))
        # label_row.addWidget(make_label("Option's Select:"))
        # label_row.addSpacerItem(QSpacerItem(120, 0, QSizePolicy.Fixed))
        label_row.addWidget(make_label("Vehicle Name:"))
        label_row.addSpacerItem(QSpacerItem(150, 0, QSizePolicy.Fixed))
        label_row.addWidget(make_label("Direction '< 1'  '2 >':"))
        label_row.addSpacerItem(QSpacerItem(80, 0, QSizePolicy.Expanding))
        label_row.addWidget(make_label("Axle Value :"))
        label_row.addSpacerItem(QSpacerItem(1200, 0, QSizePolicy.Expanding))
        layout.addLayout(label_row)

        # --- Input Row --- 
        input_row = QHBoxLayout()

        self.vehicle_no_input = QLineEdit()
        self.vehicle_no_input.setFixedWidth(80)
        self.vehicle_no_input.setPlaceholderText("No")
        self.vehicle_no_input.setValidator(QRegExpValidator(QRegExp("[0-9hHmMoOrRcCzZaAvV]{1}")))
        input_row.addWidget(wrap_in_box(self.vehicle_no_input, 100))

        # self.vehicle_name_label = make_label("")
        # self.vehicle_name_label.setVisible(False)

        self.vehicle_name_combo = QComboBox()
        self.vehicle_name_combo.setEnabled(False)
        self.vehicle_name_combo.setFixedWidth(200)



        vehicle_name_section = QHBoxLayout()
        vehicle_name_section.addWidget(self.vehicle_name_combo)

        vehicle_name_widget = QWidget()
        vehicle_name_widget.setLayout(vehicle_name_section)
        self.vehicle_name_wrapper = wrap_in_box(vehicle_name_widget, 250)

        input_row.addWidget(self.vehicle_name_wrapper) #----------------------
        input_row.addItem(QSpacerItem(150, 0, QSizePolicy.Fixed, QSizePolicy.Minimum))

        self.dir_input = QLineEdit()
        self.dir_input.setFixedWidth(50)
        self.dir_input.setPlaceholderText("1/2")
        self.dir_input.setValidator(QRegExpValidator(QRegExp("[1-2]{1}")))
        input_row.addWidget(wrap_in_box(self.dir_input, 80))


        self.new_axle_value = ""
        self.axle_vale = QLineEdit()
        self.axle_vale.setFixedWidth(150)
        self.axle_vale.setVisible(False)
        
        # 1. Run validation as user types (optional, for live feedback)
        self.axle_vale.textChanged.connect(self.check_axle_value)

        # 2. Trigger focus change only when Enter is pressed
        self.axle_vale.returnPressed.connect(self.on_axle_enter_pressed)


        # Set validator to only allow integers > 5
        validator = QIntValidator(4, 9999, self)  # starts from 6
        self.axle_vale.setValidator(validator)

        # Apply styling
        self.axle_vale.setStyleSheet("""
            *{
                padding:0;
                margin: 0;
            }
            QLineEdit {
                padding: 4px;
                border: 1px solid black;
                border-radius: 4px;
                background-color: #fcfcfc;
                font-size: 13px;
                color: #222;
                margin-left: 80px;
            }
            QLineEdit:focus {
                border: 1.5px solid #007BFF;
                background-color: #ffffff;
            }
            QLineEdit:disabled {
                background-color: #eeeeee;
                color: #999999;
            }
        """)

        input_row.addWidget(self.axle_vale)


        self.add_btn = QPushButton("Add")
        self.add_btn.setFixedHeight(42)
        self.add_btn.setStyleSheet("""
            QPushButton {
                background-color: #2C82C9;
                color: white;
                border: none;
                padding: 12px 18px;
                font-weight: bold;
                border-radius: 5px;
                margin-left: 200px;
            }
            QPushButton:focus {
                border: 2px solid orange;
                background-color: #3A3F44;
            }
        """)
        input_row.addWidget(self.add_btn)
        input_row.addSpacerItem(QSpacerItem(40, 0, QSizePolicy.Expanding))
        layout.addLayout(input_row)

        # --- Vehicle Buttons Row --- 
        button_row = QHBoxLayout()
        for code, label in [
            ("H", "HCV"), ("M", "MAV"), ("O", "OSV"), ("R", "RICKS"),
            ("1", "BICYCLE"), ("2", "2W"), ("3", "3W"), ("4", "TRACTOR"),
            ("5", "T TRAILER"), ("6", "SCV"), ("7", "LMV"),
            ("8", "LCV"), ("9", "MCV"), ("0", "OSM"), ("Z", "ANIMAL"), ("A", "AMBLULANCE CAR"), ('V', "PRIVATE BUS")
        ]:
            btn = QPushButton(f"{code} {label}")
            btn.setStyleSheet("""
                QPushButton {
                    background-color: #3A3F44;
                    color: white;
                    border: 1px solid #5A5F66;
                    padding: 4px 6px;
                    font-weight: bold;
                    border-radius: 5px;
                    margin: 0px 5px;
                    margin-top: 8px;
                }
                QPushButton:hover {
                    background-color: #4A4F55;
                }
            """)
            btn.clicked.connect(lambda _, c=code: self.handle_vehicle_button_click(c))
            button_row.addWidget(btn) #-------------------------------------------------------------------
            button_row.setSpacing(0)
            button_row.setContentsMargins(0, 0, 0, 0)       
        layout.addLayout(button_row)
        layout.setSpacing(0)
        layout.setContentsMargins(0, 0, 0, 0) 

        # Connections
        self.vehicle_no_input.textChanged.connect(self.handle_vehicle_code)
        for widget in [self.vehicle_no_input, self.vehicle_name_combo, self.dir_input, self.add_btn]:
            widget.installEventFilter(self)


        self.add_btn.clicked.connect(self.clear_and_reset)


        
        self.popup_filter = PopupEventFilter(
            self.vehicle_name_combo,
            self.dir_input,
            self.axle_vale,
            self.add_btn
        )
        self.vehicle_name_combo.view().installEventFilter(self.popup_filter)
        # ---------------------------------------------------
        self.vehicle_no_input.installEventFilter(self)
        self.vehicle_name_combo.installEventFilter(self)
        self.dir_input.installEventFilter(self)
        self.add_btn.installEventFilter(self)
        # ----------------------------------------------------



    def handle_vehicle_button_click(self, code):
        self.vehicle_no_input.setText(code.upper())
        self.handle_vehicle_code(code)


        

    def handle_vehicle_code(self, text):
        key = text.strip().lower()

        if key in {"o", "m"}:
            self.axle_vale.setVisible(True)
            self.axle_vale.clear()
        else:
            self.axle_vale.setVisible(False)
              

        vehicle_names = self.vehicle_mapping.get(key)

        if vehicle_names:
            self.vehicle_name_combo.clear()

            for i, name in enumerate(vehicle_names):
                self.vehicle_name_combo.addItem(f"{i + 1}. {name}")

            # Show or hide based on number of options
            is_multiple = len(vehicle_names) > 1
            # ---------------------------------------------------------------------------------------------
            self.vehicle_name_combo.setEnabled(is_multiple)
            # self.vehicle_name_label.setVisible(is_multiple)

            if is_multiple:
                self.vehicle_name_combo.setCurrentIndex(0)
                self.vehicle_name_combo.showPopup()
                self.vehicle_name_combo.setFocus()
            else:
                # Focus logic if only one vehicle
                if self.dir_input.isVisible():
                    if self.dir_input.text().strip():
                        self.dir_input.clear()
                    self.dir_input.setFocus()
                elif self.axle_vale.isVisible():
                    if self.axle_vale.text().strip():
                        self.axle_vale.clear()
                    self.axle_vale.setFocus()
                else:
                    self.add_btn.setFocus()
        else:
            # Handle case where no vehicles match the code
            self.vehicle_name_combo.clear()
            self.vehicle_name_combo.setEnabled(False)
            self.vehicle_name_combo.hidePopup()
            self.axle_vale.setVisible(True)


    def eventFilter(self, source, event):
        if event.type() == QEvent.KeyPress:
            key = event.key()
            text = event.text()

            if source == self.vehicle_no_input:
                if key in [Qt.Key_B, Qt.Key_F, Qt.Key_Space, Qt.Key_Plus, Qt.Key_Minus]:
                    if key == Qt.Key_B:
                        self.body.seek_backward()
                    elif key == Qt.Key_F:
                        self.body.seek_forward()
                    elif key == Qt.Key_Space:
                        self.body.toggle_play()
                    elif key == Qt.Key_Plus or text == '+':
                        self.body.increase_speed()
                    elif key == Qt.Key_Minus or text == '-':
                        self.body.decrease_speed()
                    return True
                





            elif source == self.vehicle_name_combo:
                if key in [Qt.Key_1, Qt.Key_2, Qt.Key_3, Qt.Key_4]:
                    index = key - Qt.Key_1  # 0, 1, 2
                    if 0 <= index < self.vehicle_name_combo.count():
                        self.vehicle_name_combo.setCurrentIndex(index)
                        self.vehicle_name_combo.activated.emit(index)
                        self.vehicle_name_combo.hidePopup()
                        QTimer.singleShot(0, self._focus_next_field)
                        return True

                elif key in [Qt.Key_Return, Qt.Key_Enter]:
                    popup = self.vehicle_name_combo.view()
                    current_index = popup.currentIndex()  # Get current highlighted index in popup

                    if current_index.isValid():
                        self.vehicle_name_combo.setCurrentIndex(current_index.row())
                        self.vehicle_name_combo.activated.emit(current_index.row())
                        self.vehicle_name_combo.hidePopup()
                        QTimer.singleShot(0, self._focus_next_field)
                        return True

                    






            elif source == self.dir_input:
                if text in ['1', '2']:
                    if self.axle_vale.isVisible():
                        QTimer.singleShot(0, lambda: self.axle_vale.setFocus())
                    else:
                        QTimer.singleShot(0, lambda: self.add_btn.setFocus())
                    return False

            elif source == self.add_btn and key in [Qt.Key_Return, Qt.Key_Enter, Qt.Key_Space]:
                self.add_btn.click()
                QTimer.singleShot(0, lambda: self.vehicle_no_input.setFocus())
                return True
            
            elif source == self.add_btn and key == Qt.Key_Tab:
                QTimer.singleShot(0, lambda: (self.vehicle_no_input.clear(), self.vehicle_no_input.setFocus()))
                return True
        return super().eventFilter(source, event)
    

    def _focus_next_field(self):
        if self.dir_input.isVisible():
            if self.dir_input.text().strip():
                self.dir_input.clear()
            self.dir_input.setFocus()
        elif self.axle_vale.isVisible():
            if self.axle_vale.text().strip():
                self.axle_vale.clear()
            self.axle_vale.setFocus()
        else:
            self.add_btn.setFocus()




    # Update the visibility of the direction input field in the footer.
    def update_footer_dir_visibility(self, is_visible):
        self.dir_input.setVisible(is_visible)


    def check_axle_value(self, text):
        if text.isdigit():
            value = int(text)
            self.new_axle_value = text
            self.axle_value_valid = 2 <= value <= 30
        else:
            self.axle_value_valid = False  # Mark invalid if not a digit

    def on_axle_enter_pressed(self):
        text = self.axle_vale.text()
        self.check_axle_value(text)  # Validate latest input

        if getattr(self, 'axle_value_valid', False):
            self.add_btn.click()


    def clear_and_reset(self):
        # Step 1: Get vehicle number/code
        vehicle_code_input = self.vehicle_no_input.text().strip().lower()
        selected_vehicle_name = None

        # Check if the footer direction input is visible
        if self.dir_input.isVisible() and self.dir_input.text().strip():
            self.direction_value  = self.dir_input.text()  # From footer
        else:
            # If footer's dir_input is not visible, take from header's dir_input
            header_dir_input = self.header.dir_input
            self.direction_value  = header_dir_input.currentText()

        # Step 2: Get selected vehicle name from combo box or mapping
        if self.vehicle_name_combo.isVisible() and self.vehicle_name_combo.count() > 0:
            selected_vehicle_name = self.vehicle_name_combo.currentText().split(". ", 1)[1]
        elif vehicle_code_input in self.vehicle_mapping:
            names = self.vehicle_mapping[vehicle_code_input]
            if names:
                selected_vehicle_name = names[0]  # Choose the first name if multiple

        # Step 3: Find the code that maps to this vehicle name
        matched_code = None
        if selected_vehicle_name:
            for code, names in self.vehicle_mapping.items():
                if any(selected_vehicle_name.lower() == name.lower() for name in names):
                    matched_code = code
                    break

        # Step 4: Fetch data from vehicle_map using matched_code
        if matched_code and matched_code in self.vehicle_map:
            wb, axles, cls = self.vehicle_map[matched_code]
            new_axles = self.new_axle_value if self.new_axle_value else axles
            self.add_row([wb,self.direction_value, new_axles, cls, selected_vehicle_name], vehicle_code=matched_code)
        else:
            print("Vehicle code not found ")

        # Step 5: Clear/reset fields
        self.vehicle_no_input.clear()
        self.vehicle_name_combo.clear()
        self.vehicle_name_combo.setEnabled(False)
        # self.vehicle_name_label.clear()
        # self.vehicle_name_label.setVisible(False)
        self.axle_vale.clear()
        self.axle_vale.setVisible(False)
        self.dir_input.clear()
        self.vehicle_no_input.setFocus()
        self.new_axle_value = ""

