import React from "react";


class ProgressBar extends React.Component {

    render() {
        const { completed } = this.props;

        const containerStyles = {
            height: 50,
            width: '100%',
            backgroundColor: "#e0e0de",
            borderRadius: 50,
            marginTop: '1rem',
            marginBottom: '1rem',
          }
        
          const fillerStyles = {
            height: '100%',
            width: `${completed}%`,
            backgroundColor: '#bb86fc',
            borderRadius: 'inherit',
            textAlign: 'right'
          }
        
          const labelStyles = {
            height: 50,
            padding: 5,
            color: 'white',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }

          const flexSections = {
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginBottom: '1rem',
          }

          const backgroundColor = {
            backgroundColor: 'rgba(59, 62, 64, 0.5)',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            borderRadius: 8,
            marginBottom: '1rem'
          }

        return (
          <div className="container">
            <div className="container" style={backgroundColor}>
                <div style={containerStyles}>
                    <div style={fillerStyles}>
                        <span style={labelStyles}>{`${completed}%`}</span>
                    </div>
                </div>
                <div style={flexSections}>
                    <span>Cart</span>
                    <span>Shipping</span>
                    <span>Payment</span>
                    <span>Confirmation</span>
                </div>
            </div>
          </div>
        );
    }
}

export default ProgressBar;