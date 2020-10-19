import React, { useState, useEffect, } from 'react';
import classes from '../Auth.module.css';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Auth from '../Auth';
import { checkValidity, } from '../../../utils/validation';
import { updateObject, } from '../../../utils/transform';
import * as actions from '../../../redux/actions/index';

const Login: React.FC = () => {

    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state.auth.loading);
    const error = useSelector((state: any) => state.auth.error);
    const isAuthenticated = useSelector((state: any) => state.auth.token !== null);
    const authRedirectPath = useSelector((state: any) => state.auth.authRedirectPath);
    const onLogin = (username: string, password: string, isSignup: boolean) => dispatch(actions.authLogin(username, password, isSignup));
    const onSetAuthRedirectPath = () => dispatch(actions.setAuthRedirectPath('/'));

    const [controls, setControls]: any = useState(
        {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                },
                valid: false,
                touched: false,
            },
        },
    );

    const [isSignup, setIsSignup] = useState(false);

    useEffect(() => {
        if (isAuthenticated && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        };
    }, [isAuthenticated, authRedirectPath, onSetAuthRedirectPath]);

    const inputChangedHandler = (event: any, controlName: any) => {
        const updateControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true,
            }),
        });
        setControls(updateControls);
    };

    const submitHandler = (event: any) => {
        event.preventDefault();
        onLogin(controls.username.value, controls.password.value, isSignup);
    };

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    };

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key],
        });
    };

    let form: any = formElementsArray.map((formElement: any) => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event: ListeningStateChangedEvent) => inputChangedHandler(event, formElement.id)}
        />
    ));

    if (loading) {
        form = <Spinner />;
    };

    let errorMessage = null;

    if (error) {
        errorMessage = (
            <p>{error.message}</p>
        );
    };

    let authRedirect = null;

    if (isAuthenticated) {
        authRedirect = <Redirect to={authRedirectPath} />
    };

    return (
        <>
            {!!isSignup ? <Auth /> :

                <div className={classes.Auth}>
                    {authRedirect}
                    {errorMessage}
                    <form onSubmit={submitHandler}>
                        {form}
                        <Button btnType='Success'>Submit</Button>
                    </form>
                    <Button
                        clicked={switchAuthModeHandler}
                        btnType='Danger'
                    >
                        Switch to {isSignup ? 'Signin' : 'Signup'}
                    </Button>
                </div>
            }
        </>
    );
};

export default Login;