from PySide6.QtWidgets import QWidget, QVBoxLayout
from PySide6.QtWebEngineWidgets import QWebEngineView

class DevPanel(QWidget):
    def __init__(self):
        super().__init__()
        self.resize(800, 600)
        self.devpan_view = QWebEngineView()
        layout = QVBoxLayout()
        layout.addWidget(self.devpan_view)
        self.setLayout(layout)

