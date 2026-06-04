from PySide6.QtWidgets import QMainWindow, QApplication, QDockWidget
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtCore import QUrl, Qt
from sys import argv

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.webView = QWebEngineView()
        self.webView.setUrl(QUrl.fromLocalFile('/home/matteo/repo/python/pdf_man_v1/web/viewer.html'))
        self.setCentralWidget(self.webView)

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
            self.webView.page().runJavaScript(
                """
                function addStyling() {
                    let text_elements = document.querySelectorAll('.textLayer :is(span, br)')
                    Object.values(text_elements).forEach((element) => {
                        element.style.userSelect = 'none'
                        element.style.cursor = 'default'
                    })
                }

                function qtGetPage(e) {
                    for (let element of e.composedPath()) {
                        if (element == e.currentTarget) return
                        if (element.classList.contains('page')) {
                            return element
                        }
                    }
                }

                function handleMouseDown(e) {
                    if (qt_selection instanceof qtSelection) qt_selection.destroy()
                    let qtPage = qtGetPage(e)

                    qt_selection = new qtSelection(qtPage)
                    qt_selection.p1 = { x1: e.clientX, y1: e.clientY }
                    qt_viewer.addEventListener("mousemove", handleMouseMove)
                }
                function handleMouseMove(e) {
                    qt_selection.p2 = { x2: e.clientX, y2: e.clientY }
                }
                function handleMouseUp() {
                    qt_viewer.removeEventListener("mousemove", handleMouseMove)
                }

                addStyling()
                qt_viewer.addEventListener("mousedown", handleMouseDown)
                qt_viewer.addEventListener("mouseup", handleMouseUp)
                """
            )
        else:
            self.webView.page().runJavaScript(
                """
                function restoreStyling() {
                    let text_elements = document.querySelectorAll('.textLayer :is(span, br)')
                    Object.values(text_elements).forEach((element) => {
                        element.style.userSelect = 'initial'
                        element.style.cursor = 'initial'
                    })
                }

                if (typeof qt_selection !== 'undefined') qt_selection.destroy()
                restoreStyling()
                qt_viewer.removeEventListener("mousedown", handleMouseDown)
                qt_viewer.removeEventListener("mousemove", handleMouseMove)
                qt_viewer.removeEventListener("mouseup", handleMouseUp)
                """
            )

app = QApplication(argv)

window = MainWindow()
window.showMaximized()
window.show()
app.exec()