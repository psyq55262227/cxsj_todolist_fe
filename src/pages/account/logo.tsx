import Lottie from 'react-lottie';
import logo from '@/assets/json/account.json';
import { FC, ReactElement } from 'react';

const Logo: FC = (): ReactElement => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: logo,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <Lottie options={defaultOptions}
            height={500}
            width={500}
        // isStopped={this.state.isStopped}
        // isPaused={this.state.isPaused} 
        />
    )
}
export default Logo;