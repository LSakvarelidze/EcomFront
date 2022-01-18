import react from 'react'
import styles from './Button.module.css'

const Button = props => {
    return (
        <button onClick={props.addToCart}>{props.children}</button>
    )
}

export default Button