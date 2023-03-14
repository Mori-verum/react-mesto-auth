import successful from '../images/Successful.svg'
import unsuccessful from '../images/Unsuccessful.svg'
import { useNavigate } from 'react-router-dom';

function InfoTooltip(props) {
    const navigate = useNavigate();

    function handleClose() {
        props.setIsSuccessful(null);
        props.onClose();
        navigate('/sign-in', { replace: true });
    }

    return (
        <div className={`popup popup_info-tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <img className='popup__registration-sign' alt="" src={props.isSuccessful ? successful : unsuccessful} />
                <p className='popup__subtitle'>{props.textForInfoTooltip}</p>
                <button aria-label="Закрыть модальное окно" type="button" className="popup__close-button" onClick={props.isSuccessful ? handleClose : props.onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;