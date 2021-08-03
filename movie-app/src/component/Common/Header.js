import React from 'react'

const Header = () => {
    return (
        <header className="header">
        <h1>HELPER ROBOTICS</h1>
        <p>당신만을 위한 맞춤형 서빙 솔루션</p>
        <select>
          <option>매장관리</option>
          <option>관제시스템</option>
          <option>마감정산</option>
          <option>원격지원</option>
        </select>
        </header>  
    )
}

export default Header
