const qtSelectionMode = {
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

    addStyling() {
        this.text_elements = document.querySelectorAll('.textLayer :is(span, br)')
        Object.values(this.text_elements).forEach((element) => {
            element.style.userSelect = 'none'
            element.style.cursor = 'default'
        })
    },

    restoreStyling() {
        this.text_elements = document.querySelectorAll('.textLayer :is(span, br)')
        Object.values(this.text_elements).forEach((element) => {
            element.style.userSelect = 'initial'
            element.style.cursor = 'initial'
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
        if (qtSelectionMode.qt_selection) qtSelectionMode.qt_selection.destroy()
        let qtPage = qtSelectionMode.qtGetPage(e)
        qtSelectionMode.qt_selection = new qtSelectionMode.qtSelection(qtPage)
        qtSelectionMode.qt_selection.p1 = { x1: e.clientX, y1: e.clientY }
        qtSelectionMode.qt_viewer.addEventListener("mousemove", qtSelectionMode.handleMouseMove)
    },

    handleMouseMove(e) {
        qtSelectionMode.qt_selection.p2 = { x2: e.clientX, y2: e.clientY }
    },

    handleMouseUp() {
        qtSelectionMode.qt_viewer.removeEventListener("mousemove", qtSelectionMode.handleMouseMove)
    },

    start() {
        this.addStyling()
        this.qt_viewer.addEventListener("mousedown", this.handleMouseDown)
        this.qt_viewer.addEventListener("mouseup", this.handleMouseUp)
    },

    stop() {
        if (typeof qtSelectionMode.qt_selection !== 'undefined') qtSelectionMode.qt_selection.destroy()
        this.restoreStyling()
        this.qt_viewer.removeEventListener("mousedown", this.handleMouseDown)
        this.qt_viewer.removeEventListener("mousemove", this.handleMouseMove)
        this.qt_viewer.removeEventListener("mouseup", this.handleMouseUp)
    },

    elementRect: class {
        constructor(el) {
            this.x1 = el.getBoundingClientRect().x
            this.x2 = el.getBoundingClientRect().x + el.getBoundingClientRect().width
            this.y1 = el.getBoundingClientRect().y
            this.y2 = el.getBoundingClientRect().y + el.getBoundingClientRect().height
        }
    },

    collide(firstEl, secondEl) {
        let el1 = new this.elementRect(firstEl)
        let el2 = new this.elementRect(secondEl)

        if (((el2.x1 >= el1.x1) && (el2.x1 <= el1.x2)) && ((el2.y1 >= el1.y1) && (el2.y1 <= el1.y2))) {
            return true
        } else if (((el2.x2 >= el1.x1) && (el2.x1 <= el1.x2)) && ((el2.y2 >= el1.y1) && (el2.y1 <= el1.y2))) {
            return true
        } else {
            return false
        }
    },

    getCollidingElements() {
        let selection = document.getElementById('selector-div')
        let elements = document.querySelectorAll('.textLayer :is(span)')
        let selected = Array.from(elements).filter((el) => {
            return this.collide(selection, el)
        })
        selected.forEach((el, i) => {
            console.log(`${i}: ${el.textContent}`)
        })
    }
}

export { qtSelectionMode }