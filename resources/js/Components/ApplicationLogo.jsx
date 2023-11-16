import Logo from '../../../public/Logo.jpeg';

export default function ApplicationLogo(props) {
    return (
        <img src={Logo} width="70" height="70" style={{ borderRadius: '10%' }}  alt="Your Logo" />
    );
}
