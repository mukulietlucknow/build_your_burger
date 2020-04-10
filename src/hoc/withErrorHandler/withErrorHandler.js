import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary';

const withErrorhandler = (WrappedComponent , axios) => {
    return class extends Component{


        state = {
            error : null,
        }

        clearErrorhandler(){
            this.setState({error:null});
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState({error:null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res , error => {
                this.setState({error:error});
            });
        }

        componentWillUnmount(){
            console.log("will unmount");
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        render(){
            return(
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.clearErrorhandler}>
                   {this.state.error ? this.error.message : null}
                </Modal> 
                <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    } 
}


export default withErrorhandler;