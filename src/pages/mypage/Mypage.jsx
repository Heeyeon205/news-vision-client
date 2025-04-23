import axios from '../../api/axios'
import { useState, useEffect } from 'react'
import ErrorAlert from '../../utils/ErrorAlert';
import UpdatePage from './UpdateBtn';

export default function Mypage() {
  const [role, setRole] = useState('')
  const [userImg, setUserImg] = useState('')
  const [nickname, setNickname] = useState('')
  const [follower, setFollower] = useState('')
  const [following, setFollowing] = useState('')
  const [introduce, setIntroduce] = useState('')

  useEffect( () => {
    async function loadMypage() {
      try{
      const response = await axios.get('/api/mypage');
      const result = response.data;
      if(!result.data) { ErrorAlert(); return }
      setRole(result.role);
      setUserImg(result.data.image);
      setNickname(result.data.nickname);
      setFollower(result.data.followerCount);
      setFollowing(result.data.followingCount);
      setIntroduce(result.data.introduce);
      }catch(error){
        ErrorAlert();
        console.log(error);
      }
    }
    loadMypage();
  }, [])

  return (
    <div className="mypageContainer">
      <div className='userPortion'>
        <div className='profile1'>
          <img src={userImg} alt='프로필 이미지'/>
          <UpdatePage />
        </div>
        <div className='profile2'>
          <p>{nickname}</p>
        </div>
        <div className='profile3'>
          팔로워<span>{follower}</span> 팔로잉<span>{following}</span>
        </div>
        <div className='profile4'>
          <p>{introduce}</p>
        </div>
      </div>

      <div className='btnGroupe'>
        {role ? <span>뉴스</span>: ''}
        <span>아티클</span> <span>스크랩</span>
      </div>

      <div className='listGroupe'>
        {/* 여기 리스트 출력할거임~ */}
      </div>

    </div>
  )
}