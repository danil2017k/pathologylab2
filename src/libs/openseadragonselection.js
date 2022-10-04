!function (e) {
  "use strict";
  if (!e.version || e.version.major < 2) throw new Error("This version of OpenSeadragonSelection requires OpenSeadragon version 2.0.0+");

  function t(t) {
    if (this.canDrag) {
      this.viewer.setMouseNavEnabled(!1);
      var i = this.viewer.viewport.deltaPointsFromPixels(t.delta, !0),
        s = this.viewer.viewport.pointFromPixel(t.position, !0), r = new e.Point(s.x - i.x, s.y - i.y);
      if (this.rect) {
        var n;
        this.restrictToImage && (n = this.rect.clone());
        var o = e.SelectionRect.fromRect(this.viewer.viewport.viewportToImageRectangle(this.rect.normalize())).round();
        if (this.rectDone) {
          if (this.allowRotation) {
            var h = this.rect.getAngleFromCenter(r), a = this.rect.getAngleFromCenter(s);
            this.rect.rotation = (this.rect.rotation + h - a) % Math.PI
          }
        } else if (this.startRotated) this.rect = l(this.rotatedStartPoint, s, this.startRotatedHeight); else {
          if (this.maxSize > 0) {
            if (o.height >= this.maxSize && i.y >= 0 && o.width >= this.maxSize && i.x >= 0) return;
            if (this.rect.height += i.y, o.width >= this.maxSize && i.x >= 0 && o.height >= this.maxSize && i.y >= 0) return;
            this.rect.width += i.x
          } else this.rect.width += i.x, this.rect.height += i.y;
          o = e.SelectionRect.fromRect(this.viewer.viewport.viewportToImageRectangle(this.rect.normalize())).round();
          var c = this.viewer.viewport.imageToViewportRectangle(this.rect.x, this.rect.y, this.maxSize, this.maxSize);
          this.maxSize > 0 && o.height >= this.maxSize && (this.rect.height = c.height), this.maxSize > 0 && o.width >= this.maxSize && (this.rect.width = c.width)
        }
        var d = this.viewer.world.getHomeBounds();
        this.restrictToImage && !this.rect.fitsIn(new e.Rect(0, 0, d.width, d.height)) && (this.rect = n)
      } else {
        if (this.restrictToImage) {
          if (!function (e, t) {
            var i = e.viewer.world.getHomeBounds();
            return t.x >= 0 && t.x <= i.width && t.y >= 0 && t.y <= i.height
          }(this, r)) return;
          !function (e, t) {
            var i;
            for (var s in {
              x: 0,
              y: 0
            }) (i = t[s] - e[s]) < 1 && i > 0 && (t[s] > 1 ? (e[s] -= t[s] - 1, t[s] = 1) : t[s] < 0 && (e[s] -= t[s], t[s] = 0))
          }(i, s)
        }
        this.startRotated ? (this.rotatedStartPoint = r, this.rect = l(r, s, this.startRotatedHeight)) : this.rect = new e.SelectionRect(r.x, r.y, i.x, i.y), this.rectDone = !1
      }
      this.draw()
    }
  }

  function i() {
    this.rect.width < 0 && (this.rect.x += this.rect.width, this.rect.width = Math.abs(this.rect.width)), this.rect.height < 0 && (this.rect.y += this.rect.height, this.rect.height = Math.abs(this.rect.height))
    if (!this.strictConfirm) {
      this.confirm()
    }
    this.viewer.setMouseNavEnabled(!0)
    this.rectDone = !0
  }

  function s() {
    this.viewer.canvas.focus()
  }

  function r(t) {
    if (this.canDrag) {
      e.addClass(this.element, "dragging");
      var i = this.viewer.viewport.deltaPointsFromPixels(t.delta, !0);
      this.rect.x += i.x, this.rect.y += i.y;
      var s = this.viewer.world.getHomeBounds();
      this.restrictToImage && !this.rect.fitsIn(new e.Rect(0, 0, s.width, s.height)) && (this.rect.x -= i.x, this.rect.y -= i.y), this.draw()
    } else this.viewer.raiseEvent("drag_selection", t)
  }

  function n() {
    e.removeClass(this.element, "dragging")

    if (!this.strictConfirm) {
        this.confirm()
    }
  }

  function o(t, i) {
    if (this.canDrag) {
      var s, r = i.delta, n = this.rect.getDegreeRotation(), o = this.restrictToImage ? this.rect.clone() : null;
      switch (0 !== n && (r = r.rotate(-1 * n, new e.Point(0, 0)), s = this.rect.getCenter()), r = this.viewer.viewport.deltaPointsFromPixels(r, !0), t) {
        case 0:
          this.rect.y += r.y, this.rect.height -= r.y;
          break;
        case 1:
          this.rect.width += r.x;
          break;
        case 2:
          this.rect.height += r.y;
          break;
        case 3:
          this.rect.x += r.x, this.rect.width -= r.x;
          break;
        case.5:
          this.rect.y += r.y, this.rect.height -= r.y, this.rect.x += r.x, this.rect.width -= r.x;
          break;
        case 1.5:
          this.rect.y += r.y, this.rect.height -= r.y, this.rect.width += r.x;
          break;
        case 2.5:
          this.rect.width += r.x, this.rect.height += r.y;
          break;
        case 3.5:
          this.rect.height += r.y, this.rect.x += r.x, this.rect.width -= r.x
      }
      if (0 !== n) {
        var h = this.rect.getCenter();
        r = h.rotate(n, s).minus(h), this.rect.x += r.x, this.rect.y += r.y
      }
      var a = this.viewer.world.getHomeBounds();
      if (this.restrictToImage && !this.rect.fitsIn(new e.Rect(0, 0, a.width, a.height)) && (this.rect = o), this.maxSize > 0) {
        var l = e.SelectionRect.fromRect(this.viewer.viewport.viewportToImageRectangle(this.rect.normalize())).round(),
          c = this.viewer.viewport.imageToViewportRectangle(this.rect.x, this.rect.y, this.maxSize, this.maxSize);
        if (this.maxSize > 0 && l.height >= this.maxSize && (this.rect.height = c.height), this.maxSize > 0 && l.width >= this.maxSize && (this.rect.width = c.width), l.height >= this.maxSize && l.width >= this.maxSize) return;
        if (l.width >= this.maxSize && l.height >= this.maxSize) return
      }
      this.draw()
    }
  }

  function h() {
    this.rect.width < 0 && (this.rect.x += this.rect.width, this.rect.width = Math.abs(this.rect.width)), this.rect.height < 0 && (this.rect.y += this.rect.height, this.rect.height = Math.abs(this.rect.height)), this.confirm()
  }

  function a(e) {
    var t = e.keyCode ? e.keyCode : e.charCode;
    13 === t ? this.confirm() : String.fromCharCode(t) === this.keyboardShortcut && this.toggleState()
  }

  function l(t, i, s) {
    if (t.x > i.x) {
      var r = t;
      t = i, i = r
    }
    var n = i.minus(t), o = t.distanceTo(i), h = -1 * Math.atan2(n.x, n.y) + Math.PI / 2,
      a = new e.Point(n.x / 2 + t.x, n.y / 2 + t.y), l = new e.SelectionRect(a.x - o / 2, a.y - s / 2, o, s, h),
      c = new e.Point(0, s);
    return c = c.rotate(l.getDegreeRotation(), new e.Point(0, 0)), l.x += c.x / 2, l.y += c.y / 2, l
  }

  e.Viewer.prototype.selection = function (t) {
    return this.selectionInstance && !t || ((t = t || {}).viewer = this, this.selectionInstance = new e.Selection(t)), this.selectionInstance
  }, e.Selection = function (l) {
    var c;
    e.extend(!0, this, {
      viewer: null,
      isSelecting: !1,
      buttonActiveImg: !1,
      rectDone: !0,
      element: null,
      canvas: null,
      overlay: null,
      toggleButton: null,
      showSelectionControl: !0,
      showConfirmDenyButtons: !0,
      styleConfirmDenyButtons: !0,
      returnPixelCoordinates: !0,
      canResize: !0,
      canDrag: !0,
      isCanvas: !1,
      isPan: !0,
      strictConfirm: false,
      onMouseDown: null,
      onMouseUp: null,
      onMouseDrag: null,
      onMouseSelect: null,
      onKeyDown: null,
      keyboardShortcut: "c",
      rect: null,
      maxSize: 0,
      alpha: .8,
      allowRotation: !0,
      startRotated: !1,
      hideAtConfirm: !0,
      startRotatedHeight: .1,
      restrictToImage: !1,
      onSelection: null,
      onCancel: null,
      onClickInside: null,
      prefixUrl: null,
      waitReDraw: this.reDrawPaper,
      navImages: {
        selection: {
          REST: "selection_rest.png",
          GROUP: "selection_grouphover.png",
          HOVER: "selection_hover.png",
          DOWN: "selection_pressed.png"
        },
        selectionConfirm: {
          REST: "selection_confirm_rest.png",
          GROUP: "selection_confirm_grouphover.png",
          HOVER: "selection_confirm_hover.png",
          DOWN: "selection_confirm_pressed.png"
        },
        selectionCancel: {
          REST: "selection_cancel_rest.png",
          GROUP: "selection_cancel_grouphover.png",
          HOVER: "selection_cancel_hover.png",
          DOWN: "selection_cancel_pressed.png"
        }
      },
      handleStyle: {
        top: "50%",
        left: "50%",
        width: "10px",
        height: "10px",
        margin: "-4px 0 0 -4px",
        background: "#000",
        border: "1px solid #ccc"
      },
      cornersStyle: {width: "10px", height: "10px", background: "#000", border: "1px solid #ccc"}
    }, l), e.extend(!0, this.navImages, this.viewer.navImages), this.element || (this.isCanvas ? (this.element = e.makeNeutralElement("canvas"), this.element.style.background = "rgba(0, 0, 0, 0.1)", this.element.id = "canvas-selection-box", this.element.resize = "true") : (this.element = e.makeNeutralElement("div"), this.element.style.background = "rgba(0, 0, 0, 0.1)", this.element.className = "selection-box")), this.borders = this.borders || [];
    for (var d = [], g = 0; g < 4; g++) this.borders[g] || (this.borders[g] = e.makeNeutralElement("div"), this.borders[g].className = "border-" + g, this.borders[g].style.position = "absolute", this.borders[g].style.width = "1px", this.borders[g].style.height = "1px", this.borders[g].style.background = "#fff"), (c = e.makeNeutralElement("div")).className = "border-" + g + "-handle", c.style.position = "absolute", c.style.top = this.handleStyle.top, c.style.left = this.handleStyle.left, c.style.width = this.handleStyle.width, c.style.height = this.handleStyle.height, c.style.margin = this.handleStyle.margin, c.style.background = this.handleStyle.background, c.style.border = this.handleStyle.border, new e.MouseTracker({
      element: this.borders[g],
      dragHandler: o.bind(this, g),
      dragEndHandler: h.bind(this, g)
    }), d[g] = e.makeNeutralElement("div"), d[g].className = "corner-" + g + "-handle", d[g].style.position = "absolute", d[g].style.width = this.cornersStyle.width, d[g].style.height = this.cornersStyle.height, d[g].style.background = this.cornersStyle.background, d[g].style.border = this.cornersStyle.border, new e.MouseTracker({
      element: d[g],
      dragHandler: o.bind(this, g + .5),
      dragEndHandler: h.bind(this, g + .5)
    }), this.borders[g].appendChild(c), this.isCanvas || this.element.appendChild(this.borders[g]), this.isCanvas || setTimeout(this.element.appendChild.bind(this.element, d[g]), 0);
    this.borders[0].style.top = 0, this.borders[0].style.width = "100%", this.borders[1].style.right = 0, this.borders[1].style.height = "100%", this.borders[2].style.bottom = 0, this.borders[2].style.width = "100%", this.borders[3].style.left = 0, this.borders[3].style.height = "100%", d[0].style.top = "-3px", d[0].style.left = "-3px", d[1].style.top = "-3px", d[1].style.right = "-3px", d[2].style.bottom = "-3px", d[2].style.right = "-3px", d[3].style.bottom = "-3px", d[3].style.left = "-3px", this.overlay || (this.overlay = new e.SelectionOverlay(this.element, this.rect || new e.SelectionRect)), this.innerTracker = new e.MouseTracker({
      element: this.element,
      clickTimeThreshold: this.viewer.clickTimeThreshold,
      clickDistThreshold: this.viewer.clickDistThreshold,
      dragEndHandler: e.delegate(this, n),
      dragHandler: e.delegate(this, r),
      clickHandler: e.delegate(this, s),
      pressHandler: this.onMouseDown,
      pinchHandler: e.delegate(this.viewer, this.viewer.innerTracker.pinchHandler),
      releaseHandler: this.onMouseUp,
      nonPrimaryPressHandler: this.onMouseSelect,
      keyHandler: this.onKeyDown
    }), this.outerTracker = new e.MouseTracker({
      element: this.viewer.canvas,
      clickTimeThreshold: this.viewer.clickTimeThreshold,
      clickDistThreshold: this.viewer.clickDistThreshold,
      dragHandler: e.delegate(this, t),
      dragEndHandler: e.delegate(this, i),
      clickHandler: e.delegate(this, s),
      startDisabled: !this.isSelecting
    }), this.keyboardShortcut && e.addEvent(this.viewer.container, "keypress", e.delegate(this, a), !1);
    var m = this.prefixUrl || this.viewer.prefixUrl || "", p = this.viewer.buttons && this.viewer.buttons.buttons,
      u = p ? this.viewer.buttons.buttons[0] : null, v = u ? u.onFocus : null, w = u ? u.onBlur : null;
    if (this.showSelectionControl && (this.toggleButton = new e.Button({
      element: this.toggleButton ? e.getElement(this.toggleButton) : null,
      clickTimeThreshold: this.viewer.clickTimeThreshold,
      clickDistThreshold: this.viewer.clickDistThreshold,
      tooltip: e.getString("Tooltips.SelectionToggle") || "Toggle selection",
      srcRest: m + this.navImages.selection.REST,
      srcGroup: m + this.navImages.selection.GROUP,
      srcHover: m + this.navImages.selection.HOVER,
      srcDown: m + this.navImages.selection.DOWN,
      onRelease: this.toggleState.bind(this),
      onFocus: v,
      onBlur: w
    }), p && (this.viewer.buttons.buttons.push(this.toggleButton), this.viewer.buttons.element.appendChild(this.toggleButton.element)), this.toggleButton.imgDown && (this.buttonActiveImg = this.toggleButton.imgDown.cloneNode(!0), this.toggleButton.element.appendChild(this.buttonActiveImg))), this.showConfirmDenyButtons) {
      this.confirmButton = new e.Button({
        element: this.confirmButton ? e.getElement(this.confirmButton) : null,
        clickTimeThreshold: this.viewer.clickTimeThreshold,
        clickDistThreshold: this.viewer.clickDistThreshold,
        tooltip: e.getString("Tooltips.SelectionConfirm") || "Confirm selection",
        srcRest: m + this.navImages.selectionConfirm.REST,
        srcGroup: m + this.navImages.selectionConfirm.GROUP,
        srcHover: m + this.navImages.selectionConfirm.HOVER,
        srcDown: m + this.navImages.selectionConfirm.DOWN,
        onRelease: this.confirm.bind(this),
        onFocus: v,
        onBlur: w
      });
      var y = this.confirmButton.element;
      y.classList.add("confirm-button"), this.isCanvas || this.element.appendChild(y), this.cancelButton = new e.Button({
        element: this.cancelButton ? e.getElement(this.cancelButton) : null,
        clickTimeThreshold: this.viewer.clickTimeThreshold,
        clickDistThreshold: this.viewer.clickDistThreshold,
        tooltip: e.getString("Tooltips.SelectionConfirm") || "Cancel selection",
        srcRest: m + this.navImages.selectionCancel.REST,
        srcGroup: m + this.navImages.selectionCancel.GROUP,
        srcHover: m + this.navImages.selectionCancel.HOVER,
        srcDown: m + this.navImages.selectionCancel.DOWN,
        onRelease: this.cancel.bind(this),
        onFocus: v,
        onBlur: w
      });
      var f = this.cancelButton.element;
      f.classList.add("cancel-button"), this.isCanvas || this.element.appendChild(f), this.styleConfirmDenyButtons && (y.style.position = "absolute", y.style.top = "50%", y.style.left = "50%", y.style.transform = "translate(-100%, -50%)", f.style.position = "absolute", f.style.top = "50%", f.style.left = "50%", f.style.transform = "translate(0, -50%)")
    }
    this.viewer.addHandler("selection", this.onSelection), this.viewer.addHandler("selection_cancel", this.onCancel), this.viewer.addHandler("drag_selection", this.onMouseDrag), this.viewer.addHandler("open", this.draw.bind(this)), this.viewer.addHandler("animation", this.draw.bind(this)), this.viewer.addHandler("resize", this.draw.bind(this)), this.viewer.addHandler("rotate", this.draw.bind(this))
  }, e.extend(e.Selection.prototype, e.ControlDock.prototype, {
    toggleState: function () {
      return this.setState(!this.isSelecting)
    }, progress: function (e) {
      if (e) {
        if (this.element) {
          var t = document.createElement("div");
          t.className = "progress-loader", this.element.appendChild(t)
        }
      } else this.removeProgress()
    }, image: function (e, t, i, s) {
      var r = document.createElement("canvas");
      r.style.width = "100%", r.style.height = "100%", r.height = i, r.width = t, r.className = "image-canvas";
      var n = r.getContext("2d");
      n.globalAlpha = s;
      var o = new Image;
      o.onload = (() => {
        n.drawImage(o, 0, 0);
        var e = document.getElementsByClassName("image-canvas");
        e && e.length > 0 && e[0].parentNode.removeChild(e[0]), this.element.appendChild(r)
      }), o.src = "data:image/jpeg;base64," + e
    }, getSize: function () {
      return {
        height: parseInt(this.element.style.height.split(".")[0].replace("px", "")),
        width: parseInt(this.element.style.width.split(".")[0].replace("px", "")),
        rect: this.rect
      }
    }, removeProgress: function () {
      for (var e = document.getElementsByClassName("progress-loader"); e.length > 0;) e[0].parentNode.removeChild(e[0])
    }, removeCanvas: function () {
      for (var e = document.getElementsByClassName("image-canvas"); e.length > 0;) e[0].parentNode.removeChild(e[0])
    }, removeTools: function () {
      for (var e = document.getElementsByClassName("tools"); e.length > 0;) e[0].parentNode.removeChild(e[0])
    }, removeInfo: function () {
      for (var e = document.getElementsByClassName("info-label"); e.length > 0;) e[0].parentNode.removeChild(e[0])
    }, removeSlideOpacity: function () {
      for (var e = document.getElementsByClassName("slide-opacity"); e.length > 0;) e[0].parentNode.removeChild(e[0])
    }, setInfo: function (e, t = !1) {
      var i;
      this.element && !t && (this.removeInfo(), (i = document.createElement("div")).className = "info-label", i.style.position = "absolute", i.style.top = "100%", i.style.minWidth = "200px", i.style.width = "100%", i.innerHTML = "<pre>" + e + "</pre>", this.element.appendChild(i));
      this.element && t && (this.removeInfo(), (i = document.createElement("div")).className = "info-label", i.style.position = "absolute", i.style.top = "58px", i.style.left = "32%", i.style.zIndex = "99", i.innerHTML = "<pre>" + e + "</pre>", this.element.parentNode.appendChild(i))
    }, showSlideOpacity: function (e) {
      if (this.element) {
        this.removeSlideOpacity();
        var t = document.createElement("input");
        t.className = "slide-opacity", t.type = "range", t.orient = "vertical", t.min = "0", t.max = "100", t.value = 100 * this.alpha, t.step = "1", this.element.appendChild(t)
      }
    }, setTools: function (e) {
      if (this.element) {
        this.removeTools();
        var t = document.createElement("div");
        t.className = "tools", t.style.position = "absolute", t.style.top = "100%", t.style.minWidth = "200px", t.style.width = "100%", t.style.padding = "5px", t.innerHTML = e, this.element.appendChild(t)
      }
    }, setState: function (e) {
      return this.isSelecting = e, this.outerTracker.setTracking(e), e ? this.draw() : this.undraw(), this.buttonActiveImg && (this.buttonActiveImg.style.visibility = e ? "visible" : "hidden"), this.viewer.raiseEvent("selection_toggle", {enabled: e}), this
    }, setAllowRotation: function (e) {
      this.allowRotation = e
    }, enable: function () {
      return this.setState(!0)
    }, disable: function () {
      return this.removeInfo(), this.removeProgress(), this.removeCanvas(), this.setState(!1)
    }, draw: function () {
      return this.rect && (this.overlay.update(this.rect.normalize()), this.overlay.drawHTML(this.viewer.drawer.container, this.viewer.viewport)), this.waitReDraw(), this
    }, reDrawPaper: function () {
      if (this.isCanvas && paper.view && this.viewer && this.viewer.world && this.viewer.world.getItemAt(0)) {
        var e = this.getSize();
        paper.view.viewSize = [e.width, e.height], paper.view.zoom = this.viewer.world.getItemAt(0).viewportToImageZoom(this.viewer.viewport.getZoom(!0)), paper.view.center = new paper.Point(0, 0), paper.view.draw()
      }
      return this
    }, drawPaper: function (e, t = !1) {
      if (this.isCanvas && paper.view && this.viewer && this.viewer.world && this.viewer.world.getItemAt(0)) {
        var i = this.getSize();
        if (paper.view.setViewSize(new paper.Size(i.width, i.height)), paper.view.zoom = this.viewer.world.getItemAt(0).viewportToImageZoom(this.viewer.viewport.getZoom(!0)), paper.view.center = new paper.Point(0, 0), e) paper.project.clear(), t ? paper.project.importJSON(e) : paper.project.importSVG(e), paper.project.activeLayer.fitBounds(paper.view.bounds); else new paper.Path.Rectangle(paper.view.bounds).selected = !1;
        paper.view.draw()
      }
      return this
    }, opacityPaper(e) {
      this.isCanvas && paper.view && this.viewer && this.viewer.world && this.viewer.world.getItemAt(0) && (paper.project.activeLayer.opacity = e)
    }, throttle: function (e, t) {
      var i, s, r = !1;
      return function n() {
        if (r) return i = arguments, void (s = this);
        e.apply(this, arguments), r = !0, setTimeout(function () {
          r = !1, i && (n.apply(s, i), i = s = null)
        }, t)
      }
    }, undraw: function () {
      return this.overlay.destroy(), this.rect = null, this
    }, getRect: function () {
      if (this.rect) {
        var t = this.rect.normalize();
        if (this.returnPixelCoordinates) {
          var i = this.viewer.viewport.viewportToImageRectangle(t);
          (i = e.SelectionRect.fromRect(i).round()).rotation = t.rotation, t = i
        }
        return t
      }
      return null
    }, confirm: function () {
      if (this.rect) {
        var t = this.rect.normalize();
        if (this.returnPixelCoordinates) {
          var i = this.viewer.viewport.viewportToImageRectangle(t);
          (i = e.SelectionRect.fromRect(i).round()).rotation = t.rotation, t = i
        }
        this.viewer.raiseEvent("selection", t), this.hideAtConfirm && this.undraw()
      }
      return this
    }, cancel: function () {
      return this.viewer.raiseEvent("selection_cancel", !1), this.undraw()
    }
  })
}(OpenSeadragon), function (e) {
  "use strict";
  e.SelectionOverlay = function (t, i) {
    e.Overlay.apply(this, arguments), e.isPlainObject(t) ? this.rotation = t.location.rotation || 0 : this.rotation = i.rotation || 0
  }, e.SelectionOverlay.prototype = e.extend(Object.create(e.Overlay.prototype), {
    drawHTML: function () {
      e.Overlay.prototype.drawHTML.apply(this, arguments), this.style.transform = this.style.transform.replace(/ ?rotate\(.+rad\)/, "") + " rotate(" + this.rotation + "rad)"
    }, update: function (t) {
      e.Overlay.prototype.update.apply(this, arguments), this.rotation = t.rotation || 0
    }
  })
}(OpenSeadragon), function (e) {
  "use strict";
  e.SelectionRect = function (t, i, s, r, n) {
    e.Rect.apply(this, [t, i, s, r]), this.rotation = n || 0
  }, e.SelectionRect.fromRect = function (t) {
    return new e.SelectionRect(t.x, t.y, t.width, t.height)
  }, e.SelectionRect.prototype = e.extend(Object.create(e.Rect.prototype), {
    clone: function () {
      return new e.SelectionRect(this.x, this.y, this.width, this.height, this.rotation)
    }, equals: function (t) {
      return e.Rect.prototype.equals.apply(this, [t]) && this.rotation === t.rotation
    }, toString: function () {
      return "[" + Math.round(100 * this.x) / 100 + "," + Math.round(100 * this.y) / 100 + "," + Math.round(100 * this.width) / 100 + "x" + Math.round(100 * this.height) / 100 + "@" + Math.round(100 * this.rotation) / 100 + "]"
    }, swapWidthHeight: function () {
      var e = this.clone();
      return e.width = this.height, e.height = this.width, e.x += (this.width - this.height) / 2, e.y += (this.height - this.width) / 2, e
    }, getDegreeRotation: function () {
      return this.rotation * (180 / Math.PI)
    }, getAngleFromCenter: function (e) {
      var t = e.minus(this.getCenter());
      return Math.atan2(t.x, t.y)
    }, round: function () {
      return new e.SelectionRect(Math.round(this.x), Math.round(this.y), Math.round(this.width), Math.round(this.height), this.rotation)
    }, normalize: function () {
      var e = this.clone();
      return e.width < 0 && (e.x += e.width, e.width *= -1), e.height < 0 && (e.y += e.height, e.height *= -1), e.rotation %= Math.PI, e
    }, fitsIn: function (e) {
      for (var t = this.normalize(), i = [t.getTopLeft(), t.getTopRight(), t.getBottomRight(), t.getBottomLeft()], s = t.getCenter(), r = t.getDegreeRotation(), n = e.getBottomRight(), o = 0; o < 4; o++) if (i[o] = i[o].rotate(r, s), i[o].x < e.x || i[o].x > n.x || i[o].y < e.y || i[o].y > n.y) return !1;
      return !0
    }, reduceRotation: function () {
      var e;
      return this.rotation < Math.PI / -4 ? (e = this.swapWidthHeight()).rotation += Math.PI / 2 : this.rotation > Math.PI / 4 ? (e = this.swapWidthHeight()).rotation -= Math.PI / 2 : e = this.clone(), e
    }
  })
}(OpenSeadragon);
//# sourceMappingURL=openseadragonselection.js.map
