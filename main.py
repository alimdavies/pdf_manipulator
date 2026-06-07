from PySide6.QtWidgets import QMainWindow, QApplication, QDockWidget
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtCore import QUrl, Qt
from sys import argv

from devpan import DevPanel

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.webView = QWebEngineView()
        self.webView.setUrl(QUrl.fromLocalFile('/home/matteo/repo/pdf_manipulator/pdfjs/web/viewer.html'))
        self.setCentralWidget(self.webView)

        self.devpan = DevPanel()
        self.devpan.show()
        self.webView.page().setDevToolsPage(self.devpan.devpan_view.page())


        self.menu_bar = self.menuBar()
        self.file_menu = self.menu_bar.addMenu('File')
        self.file_menu.addAction('Choose PDF')

        self.tool_bar = self.addToolBar('Select Text') 
        self.select_action = self.tool_bar.addAction('Select Text')
        self.select_action.setCheckable(True)
        self.select_action.triggered.connect(self.handleSelection)
        self.tool_bar.setMovable(False)

        self.dock_widget = QDockWidget()
        self.dock_widget.setMinimumWidth(500)
        self.addDockWidget(Qt.DockWidgetArea.LeftDockWidgetArea, self.dock_widget)

    def handleSelection(self, isChecked):
        if isChecked:
            self.webView.page().runJavaScript('qtSelectionMode.start()')
        else:
            self.webView.page().runJavaScript('qtSelectionMode.stop()')

app = QApplication(argv)

window = MainWindow()
window.showMaximized()
window.show()


app.exec()