var React = require('react');
var ReactDOM = require('react-dom');

var Content = React.createClass({
	render: function(){
		return (
			<div className='big'>Hello, React<span style={{color: '#00ff00', fontSize: '19px'}}>当当，敢作敢当当</span></div>
		);
	}
});

ReactDOM.render(
	<Content />,
	document.querySelector('.container')
);
