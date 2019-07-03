import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { onLogoutUser } from '../actions'

import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,DropdownToggle,
    DropdownMenu, DropdownItem } from 'reactstrap';

class Header extends Component {

    //Header Component
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }
    
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    onButtonClick = () => {
        // menghapus username dari redux state
        this.props.onLogoutUser()
    }

    render () {

        //Render kalo belom login
        if(this.props.user.username == ''){
            return (
                <div>
                    <Navbar color="light" light expand="md">
                    <NavbarBrand href="/"><h4>TOTOPEDIA</h4></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to='/register'>
                                <Button color="primary" className="mx-3">Register</Button>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/login' >
                                <Button color="success">Login</Button>
                            </Link>
                        </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )
        }else if(this.props.user.role == 'user'){
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/"><h4>TOTOPEDIA</h4></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />

                    

                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to='/cart'>
                                <Button color="primary" className="mx-3">Cart</Button>
                            </Link>
                        </NavItem>

                        <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Options
                        </DropdownToggle>
                        <DropdownMenu right>
                            <Link to={'/login'}>
                            <Button className='dropdown-item' onClick={this.onButtonClick}>
                                Logout
                            </Button>
                            </Link>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )}else{
                return(
                    <div>
                        <Navbar color="light" light expand="md">
                            <NavbarBrand href="/"><h4>TOTOPEDIA</h4></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link to='/manageproduct'>
                                        <Button>Manage Product</Button>
                                    </Link>
                                </DropdownItem>
                                <Link to ='/login'>
                                    <Button className='dropdown-item' onClick={this.onButtonClick}>
                                        Logout
                                    </Button>
                                </Link>
                            </DropdownMenu>
                            </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                        </Navbar>
                    </div>
                )
            }
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth,
        cart: state.cart // {id, username}
    }
}

export default connect(mapStateToProps, {onLogoutUser})(Header)