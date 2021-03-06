var Combobox = require('../Combobox');
var React = require('react/addons');

var {TestUtils} = React.addons;
var {Simulate} = React.addons.TestUtils;

var expect = require('expect');
var emptyFunction = require('../helpers/emptyFunction');

describe('Combobox', function() {
  it('should propagate props like placeholder to the <input>', function() {
    var combobox = TestUtils.renderIntoDocument(
      <Combobox 
        placeholder="magic"
        getOptionsForInputValue={emptyFunction}
        onChange={emptyFunction}
        value={null}
      />
    );

    var input = TestUtils.findRenderedDOMComponentWithTag(combobox, 'input');
    var inputAttributes = input.getDOMNode().attributes;

    expect(inputAttributes['placeholder'].value).toBe('magic');
  });

  it('should show value in <input>, even when the value changes', function() {
    var combobox = TestUtils.renderIntoDocument(
      <Combobox
        getOptionsForInputValue={emptyFunction}
        getLabelForOption={(option) => option.label}
        onChange={emptyFunction}
        value={{label: 'hi'}}
      />
    );

    var input = TestUtils.findRenderedDOMComponentWithTag(combobox, 'input');
    var inputNode = input.getDOMNode();

    expect(inputNode.value).toEqual('hi');
    combobox.setProps({value: {label: 'hello'}});
    expect(inputNode.value).toEqual('hello');
  });
});