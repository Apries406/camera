class Drag {
  private pageX = 0;
  private pageY = 0;
  // * 按下拖拽开始的那个点的位置
  private body?: HTMLBodyElement;

  constructor() {
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  private handleMouseMove(e: MouseEvent) {
    const x = e.pageX - this.pageX;
    const y = e.pageY - this.pageY;
    window.api.windowDrag({ x, y });
  }

  private handleMouseUp() {
    console.log("mouseup");
    document.body.removeEventListener("mousemove", this.handleMouseMove);
    document.body.removeEventListener("mouseup", this.handleMouseUp);
  }

  private handleMouseDown(e: MouseEvent) {
    this.pageX = e.pageX;
    this.pageY = e.pageY;
    // * 绑定鼠标移动事件
    document.body.addEventListener("mousemove", this.handleMouseMove);
    // * 绑定鼠标松开事件
    document.body.addEventListener("mouseup", this.handleMouseUp);
  }

  public run() {
    window.addEventListener("DOMContentLoaded", () => {
      this.body = document.querySelector("body")!;
      console.log(this.body);
      this.body.addEventListener("mousedown", this.handleMouseDown);
    });
  }
}

export default () => {
  const drag = new Drag();
  return { drag };
};
