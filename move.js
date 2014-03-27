(function ( f ){
  if ( module !== undefined && typeof exports === "object" ) {
    module.exports = f()
  }
  else if ( typeof window.define === 'function' && window.define.amd ) {
    window.define([], f)
  } else {
    window.move = f()
  }
}(function (){
  var move = {}

  function extend( obj, ext ){
    for ( var prop in ext ) {
      obj[prop] = ext
    }
    return obj
  }

  function Events(){}

  Events.prototype = {
    on: function ( event, cb ){
      ((this.events || (this.events = {}))[event] || (this.events[event] = [])).push(cb)
      return this
    },
    off: function ( event, cb ){
      if ( (this.events || (this.events = {}))[event] ) this.events[event].filter(function ( listener ){
        return listener != cb
      })
      return this
    },
    emit: function ( event, msg ){
      if ( (this.events || (this.events = {}))[event] ) this.events[event].forEach(function ( listener ){
        listener(msg)
      })
      return this
    }
  }

  function Animation( options ){

  }

  Animation.prototype =
  {
    start: function (){
      return this
    },
    pause: function (){
      return this
    },
    stop: function (){
      return this
    }
  }
  extend(Animation.prototype, Events.prototype)
  move.animate = function ( options ){
    return new Animation(options)
  }

  function Transition( options ){
    this.render = options.render
    this.duration = options.duration || 1000
    if ( move.FX[options.easing] ) {
      this.easing = move.FX[options.easing]
    }
    else {
      this.easing = options.easing || move.FX.ease
    }
  }

  Transition.prototype = {
    progress: 0,
    fps: 0,
    isPlaying: false,
    start: function ( render ){
      var start = Date.now()
        , animation = this
        , duration = animation.duration
        , easing = animation.easing
      render = render || animation.render
      animation.isPlaying = true
      !function loop(){
        if ( !animation.isPlaying ) return
        var p = (Date.now() - start) / duration
        if ( p > 1 ) {
          render(1)
        }
        else {
          requestAnimationFrame(loop, null)
          render(easing(p))
        }
      }()
      return this
    },
    pause: function (){
      this.isPlaying = false
      return this
    },
    stop: function (){
      this.isPlaying = false
      return this
    }
  }
  extend(Transition.prototype, Events.prototype)
  move.transition = function ( options ){
    return new Transition(options)
  }

  move.FX = {
    "ease": BezierEasing(0.25, 0.1, 0.25, 1.0),
    "linear": BezierEasing(0.00, 0.0, 1.00, 1.0),
    "ease-in": BezierEasing(0.42, 0.0, 1.00, 1.0),
    "ease-out": BezierEasing(0.00, 0.0, 0.58, 1.0),
    "ease-in-out": BezierEasing(0.42, 0.0, 0.58, 1.0)
  }

  function CountDown(){}

  CountDown.prototype = {
    start: function (){
      return this
    },
    pause: function (){
      return this
    },
    stop: function (){
      return this
    }
  }
  extend(CountDown.prototype, Events.prototype)

  move.countDown = function (){
    return new CountDown()
  }

  function Timer(){}

  Timer.prototype = {
    start: function (){
      return this
    },
    pause: function (){
      return this
    },
    stop: function (){
      return this
    }
  }
  extend(Timer.prototype, Events.prototype)
  move.timer = function (){
    return new Timer()
  }

  function TimeLine( options ){
    this.motions = {}
  }

  TimeLine.prototype = {
    add: function ( motion ){
      return this
    },
    start: function (){
      return this
    },
    pause: function (){
      return this
    },
    stop: function (){
      return this
    }
  }
  extend(TimeLine.prototype, Events.prototype)
  move.timeLine = function ( options ){
    return new TimeLine(options)
  }

  return move
}))