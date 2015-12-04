var React = require('react');
var classSet = require('classnames');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');

var SliderActions = require('../../actions/SliderActions');
var SliderStore = require('../../stores/SliderStore');

var data = {
  slider: [{
    "src": "/img/splash_background.jpg"
  }, {
    "src": "/img/splash_background.jpg"
  }, {
    "src": "/img/splash_background.jpg"
  }]
}


var InderSlider = React.createClass({

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [SliderStore]
  },

  contextTypes: {
    // config: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return this.getStateFromStores();
  },

  getStateFromStores: function() {
    return {
      isMouse: this.getStore(SliderStore).isMouses()
    }
  },

  onChange: function() {
    this.setState(this.getStateFromStores());
  },

  sliderNext: function() {
    var par = React.findDOMNode(this.refs.slider);
    var l = data.slider.length;
    this.i <= l - 2 ? this.i++ : this.i = 0;
    par.style.left = (-this.i * 1000) + 'px';
    this.tabChange();
  },

  sliderPrev: function() {
    var par = React.findDOMNode(this.refs.slider);
    var l = data.slider.length;
    this.i >= 1 ? this.i-- : this.i = l - 1;
    par.style.left = (-this.i * 1000) + 'px';
    this.tabChange();
  },

  componentDidMount: function() {
    this.i = 0;
    this.sId = setInterval(this.sliderNext, 3000);
  },

  tabChange: function() {
    var tabs = React.findDOMNode(this.refs.tab).children;
    // tabs.map((item, index) => {
    //     itme.className = '';
    // })
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].className = '';
    }
    tabs[this.i].className = 'on';
  },

  render: function() {
    var sliderTabInit;
    var _this = this;
    return (
      <div className="slider" onMouseEnter={this.onMouseTrue} onMouseLeave={this.onMouseFlase}>
                <div className="auto clearfix" ref="slider">
                    {
                      data.slider.map(function(v,i){
                            return (
                               <a href="" key={i} className="pull-left show">
                                   <img src={v.src} />
                               </a>
                            )
                      })
                    }
                </div>
                <div className="sliderTab" ref="tab">
                   {
                     data.slider.map(function(v,i){
                      0 == i ? sliderTabInit = 'on' : sliderTabInit = '';
                      return <span className={sliderTabInit} key={i}></span>
                     })
                   }
                </div>
                {this.clickTab()}
            </div>
    )
  },

  clickTab: function() {
    if (this.state.isMouse) {
      return (
        <div className="clickTab">
                  <span className="prev" onClick={this.sliderPrev}>prev</span>
                  <span className="next" onClick={this.sliderNext}>next</span>
               </div>
      )
    } else {
      return '';
    }
  },

  onMouseTrue: function() {
    this.executeAction(SliderActions.MouseEnter, {});
    clearInterval(this.sId);
  },

  onMouseFlase: function() {
    this.executeAction(SliderActions.MouseLeave, {});
    this.sId = setInterval(this.sliderNext, 3000);
  }
})


module.exports = InderSlider;