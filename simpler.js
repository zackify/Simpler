var simpler = {
	render: function(){
		console.log('re render')
		var doc = this.html
		doc.innerHTML = this.originalHTML
		console.log(doc.innerHTML)
		var matches = doc.innerHTML.match(/{{([^}]+)}}/gi)
		var state = this.state
		var self = this
		matches.map(function(match){
			var name = match.replace('{{', '').replace('}}','')
			if(state[name]){
				doc.innerHTML = doc.innerHTML.replace(match,state[name])
			}
		})

		matches.map(function(match){
			var name = match.replace('{{', '').replace('}}','')
			if(state[name]){
				var bindings = doc.querySelectorAll("[data-bind='"+name+"']")
				for (var index in bindings){
					var field = bindings[index]
					if(!field.nodeName) return true
					field.value = state[name]
					field.onkeyup = self.listen.bind(self)
				}
			}
		})
		this.html = doc
	},
	init: function(object,html){
		this.html = html
		this.originalHTML = html.innerHTML.toString()
		this.setState(object.getInitialState())
	},
	setState: function(values){
		this.state = values
		console.log(this.state)
		this.render()
	},
	listen: function(e){
		console.log(e)
		var name = e.target.dataset.bind
		var value = e.target.value
		var state = this.state
		state[name] = value
		this.setState(state)
	},
	createClass: function(object){

		return object;
	}
}