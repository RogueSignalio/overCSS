class OverCSS  {
// CORS one file:// fuckery
// Firefox:  security.fileuri.strict_origin_policy	=> false
// to use from local file system.
  constructor(config={}) {
    this.sheet = document.styleSheets[0]
    this.rule_list = this.sheet.cssRules;
    this.my_rules = [];
    this.orig_length = this.rule_list.length;
    this.last = [];
    this.redo = [];

    this.my_rules = {};
    this.logc = 'color: #ff8888';
    this.describe_css()
  }

  describe_css() {
    let logc = this.logc
    console.log("%c===========================================",logc)
    console.log("%cSheet: " + this.sheet.ownerNode, logc)
    console.log("%cTitle: " + this.sheet.title, logc)
    console.log("%cHRef: " + this.sheet.href, logc)
    console.log("%cType: " + this.sheet.type, logc)
    console.log("%cDisabled: " + this.sheet.disabled, logc)
    console.log("%c===========================================",logc)
  }

  get_rules(rules=this.rule_list) {
    var rule_classes = []
    for (let i=0; i < this.orig_length; i++) {
      if (rules[i].selectorText) {
        rule_classes.push(rules[i].selectorText)
      }
    }
    return rule_classes
  }
  
  show_rules(rules=this.rule_list) {
    var inc = 0;
    for (const rule of rules) {
      console.log(inc + ": ", rule);
      inc++;
    }
  }
  
  apply_style(rule,option,value,tag=null) {
    var intext = rule + "{" + option +":" + value + "}";
    this._apply_raw_css(rule,intext,tag)
  }
  
  apply_css(rule,text,tag=null) {
    var intext = rule + "{" + text + "}";
    this._apply_raw_css(rule,intext,tag)
  }

  _apply_raw_css(rule,text,tag) {
    var cur_length = this.rule_list.length;
    this.sheet.insertRule(text,cur_length);
    this.my_rules[rule] ||= [];
    this.my_rules[rule].push(cur_length);
    this.last.push(rule)
  }

  reset_css() {
    for (let i=this.rule_list.length - 1; i >= this.orig_length; i--) {
      console.log("Delete " + i );
      this.sheet.deleteRule(i);
    }
    this.my_rules = {};
  }

  undo_last() {
    let last = this.last.pop()
    this.my_rules[last] ||= [];
    if (this.my_rules[last].length == 0) return;
    let idx = this.my_rules[last].pop();
    this.redo = this.rule_list[idx]
    this.sheet.deleteRule(idx);
  }

  redo_last() {
    apply_css(this.redo.selectorText,this.rule_list[idx])
  }

  undo_rule(rule) {
    this.my_rules[rule] ||= [];
    let idx = this.my_rules[rule].pop();
    this.sheet.deleteRule(idx);
  }

  clear_rules(rule) {
    for (let i=this.my_rules[rule].length - 1; i >= 0 ; i--) {
      console.log("Delete " + this.my_rules[rule][i] + " " + rule + "," + i);
      this.sheet.deleteRule(this.my_rules[rule][i]);
    }
    this.my_rules[rule] = [];
  }  

}

