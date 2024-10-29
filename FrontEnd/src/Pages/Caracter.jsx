import React from 'react'
import { assets } from '../assets/indeks'
import { useNavigate } from 'react-router-dom';

const Caracter = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='absolute pt-3 left-[85%] sm:pl-6 sm:pt-6 z-20'>
                <button  onClick={() => navigate ('/Scenario/0')}
                    className='w-[80px] pl-20 sm:w-[150px]  md:w-[150px] h-[50px] sm:h-[55px] md:h-[60px]'
                    style={{
                        backgroundImage: `url(${assets.gambar.button2})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        transform: 'rotateY(180deg)',
                    }}
                />
            </div>
            <div className='h-screen w-screen overflow-hidden relative flex'
                style={{
                    backgroundImage: `url(${assets.gambar.bg})`
                }}>
                <button onClick={() => navigate('/ManikAngkeran')}
                    className='absolute w-[43%] h-screen left-[0] z-10'
                    style={{
                        backgroundImage: `url(${assets.gambar.poligonManik})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        aspectRatio: '1/1',
                    }}
                />
                <button onClick={() => navigate('/NagaBasugih')}
                    className='absolute w-[34%] h-screen left-[35%] z-20'
                    style={{
                        backgroundImage: `url(${assets.gambar.naga})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        aspectRatio: '1/1',
                    }}
                />
                <button onClick={() => navigate('/sidhimantra')}
                    className='absolute w-[43%] h-screen left-[60%] z-10'
                    style={{
                        backgroundImage: `url(${assets.gambar.poligonSidi})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        aspectRatio: '1/1',
                    }}
                />
            </div>
        </>
    )
}

export default Caracter
