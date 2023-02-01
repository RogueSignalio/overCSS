//var = Vue.defineComponent({
const colors = [
  {
    options: window.getRules(),
    selectedOption: "",
    text: ""
  }
]
var cssRulez = {
  props: {
    myClass: String,
    myStyle: String
  },
  data: function() {
    return { colors }
      // class_option: '',
      // class_options: window.getRules()
    // }
  },
//   ,
//   created () {
// //    console.log('Growler Init OK...');
// //    window.action_session_growl = this.growlDaddy
//   },
  methods: {
    applyCss (rule,style) {
      window.applyCss(rule,style);
    },
    clearCss (rule,style) {
      window.clearRules(rule);
    },
    onChange(event) {
      console.log(event.target.value)
    }
  },
  template: '<div><select v-for="color in colors" v-model="color.selectedOption" @change="onChange($event)">'+
            '<option v-for="option in color.options" :value="option">{{ option }}</option></select>'+
            '<input />'+
            '</div>'
  // template: '<div><label for="style-classes-choice">Choose a style:</label>'+
  //           '<select v-for="class_option in class_options" v-model="class_option">'+
  //           '<option v-for="option in class_options" :value="option">'+
  //           '</option>' +
  //           '</div>'
}
//);
