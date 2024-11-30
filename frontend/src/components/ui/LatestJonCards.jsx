import React from 'react'
import { Badge } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function LatestJonCards() {
    const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/desctipion")}>
      
    </div>
  )
}

export default LatestJonCards
