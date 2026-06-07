const goSelectionMode = {
    qt_viewer: document.getElementById('viewer'),

    qtSelection: class {
        constructor(page) {
            this.x1
            this.y1
            this.x2
            this.y2
            this.page = page
            this.init()
        }

        init() {
            this.div = document.createElement('div')
            this.div.id = "selector-div"
            this.div.style.setProperty('border', '1px dotted #000')
            this.div.style.setProperty('position', 'absolute')
            this.page.appendChild(this.div)
        }

        build() {
            this.pageX = this.page.getBoundingClientRect().x
            this.pageY = this.page.getBoundingClientRect().y
            this.pageBorderLeft = getComputedStyle(this.page).borderLeftWidth.slice(0, -2)
            this.pageBorderTop = getComputedStyle(this.page).borderTopWidth.slice(0, -2)
            this.x3 = Math.min(this.x1, this.x2)
            this.y3 = Math.min(this.y1, this.y2)
            this.x4 = Math.max(this.x1, this.x2)
            this.y4 = Math.max(this.y1, this.y2)
            this.div.style.left = this.x3 - this.pageX - this.pageBorderLeft + 'px'
            this.div.style.top = this.y3 - this.pageY - this.pageBorderTop + 'px'
            this.div.style.width = this.x4 - this.x3 + 'px'
            this.div.style.height = this.y4 - this.y3 + 'px'
        }

        destroy() {
            this.div.remove()
        }

        set p1( p = {} ) {
            this.x1 = p.x1
            this.y1 = p.y1
            this.x2 = p.x1
            this.y2 = p.y1
            this.build()
        }

        set p2( p = {} ) {
            this.x2 = p.x2
            this.y2 = p.y2
            this.build()
        }
    },

    // ADD STYLING RITORNA CORRETTAMENTE GLI OGGETTI!!
    addStyling() {
        this.text_elements = document.querySelectorAll('.textLayer :is(span, br)')
        Object.values(this.text_elements).forEach((element) => {
            element.style.userSelect = 'none'
            element.style.cursor = 'default'
        })
    },

    qtGetPage(e) {
        for (let element of e.composedPath()) {
            if (element == e.currentTarget) return
            if (element.classList.contains('page')) {
                return element
            }
        }
    },

    handleMouseDown(e) {
        if (goSelectionMode.qt_selection) goSelectionMode.qt_selection.destroy()
        let qtPage = goSelectionMode.qtGetPage(e)
        goSelectionMode.qt_selection = new goSelectionMode.qtSelection(qtPage)
        goSelectionMode.qt_selection.p1 = { x1: e.clientX, y1: e.clientY }
        goSelectionMode.qt_viewer.addEventListener("mousemove", goSelectionMode.handleMouseMove)
    },

    handleMouseMove(e) {
        goSelectionMode.qt_selection.p2 = { x2: e.clientX, y2: e.clientY }
    },

    handleMouseUp() {
        goSelectionMode.qt_viewer.removeEventListener("mousemove", goSelectionMode.handleMouseMove)
    },

    start() {
        this.addStyling()
        this.qt_viewer.addEventListener("mousedown", this.handleMouseDown)
        this.qt_viewer.addEventListener("mouseup", this.handleMouseUp)
    }
}

export { goSelectionMode }