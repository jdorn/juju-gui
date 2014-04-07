JSONEditor.defaults.editors.string = JSONEditor.defaults.editors.string.extend({
  build: function() {
    this._super();
    
    this.container.className = "settings-wrapper";
    
    
    this.input.classNaame += ' config-field';
    this.input.setAttribute('name',this.key);
    this.input.setAttribute('id','input-'+this.key);
    this.input.setAttribute('data-bind','config.'+this.key);
    
    var hidden_resolver = document.createElement('div');
    hidden_resolver.className = 'hidden resolver';
    var conflicted = document.createElement('div');
    conflicted.className = 'config-field conflicted-env';
    conflicted.setAttribute('id','input-'+this.key+'-env');
    hidden_resolver.appendChild(conflicted);
    
    this.container.appendChild(hidden_resolver);
  }
});

JSONEditor.defaults.editors.object = JSONEditor.defaults.editors.object.extend({
  build: function() {
    this._super();
    this.title.style.display = 'none';
    this.editor_holder.style.border = '';
    this.editor_holder.style.margin = '';
    this.editor_holder.style.padding = '';
  }
});
