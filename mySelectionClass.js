let qt_selection
const qt_viewer = document.getElementById('viewer')

class qtSelection {
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
}