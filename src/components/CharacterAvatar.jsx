import React from 'react'

function CharacterAvatar({ character, size = 'medium' }) {
  const getBodyStyle = () => {
    switch (character.bodyType) {
      case 'slim': return 'slim-body'
      case 'muscular': return 'muscular-body'
      default: return 'average-body'
    }
  }

  const getHairStyle = () => {
    switch (character.hairStyle) {
      case 'short': return 'short-hair'
      case 'long': return 'long-hair'
      default: return 'medium-hair'
    }
  }

  const getOutfitStyle = () => {
    switch (character.outfit) {
      case 'sport': return 'sport-outfit'
      case 'elite': return 'elite-outfit'
      default: return 'basic-outfit'
    }
  }

  const sizeClass = {
    small: 'avatar-small',
    medium: 'avatar-medium',
    large: 'avatar-large'
  }[size]

  return (
    <div className={`character-avatar ${sizeClass}`}>
      <div className="avatar-container">
        {/* Тело */}
        <div className={`avatar-body ${getBodyStyle()}`}>
          {/* Голова */}
          <div className="avatar-head">
            {/* Волосы */}
            <div className={`avatar-hair ${getHairStyle()}`}></div>
            {/* Лицо */}
            <div className="avatar-face">
              <div className="avatar-eyes">
                <div className="avatar-eye"></div>
                <div className="avatar-eye"></div>
              </div>
              <div className="avatar-mouth"></div>
            </div>
          </div>
          
          {/* Тело */}
          <div className="avatar-torso">
            {/* Одежда */}
            <div className={`avatar-outfit ${getOutfitStyle()}`}>
              {character.outfit === 'elite' && (
                <div className="outfit-details">
                  <div className="detail-stripe"></div>
                  <div className="detail-stripe"></div>
                </div>
              )}
            </div>
          </div>
          
          {/* Руки */}
          <div className="avatar-arms">
            <div className="avatar-arm left"></div>
            <div className="avatar-arm right"></div>
          </div>
          
          {/* Ноги */}
          <div className="avatar-legs">
            <div className="avatar-leg left"></div>
            <div className="avatar-leg right"></div>
          </div>
        </div>

        {/* Аксессуары */}
        {character.coins > 500 && (
          <div className="avatar-accessory">
            <div className="accessory-crown">
              <i className="fas fa-crown"></i>
            </div>
          </div>
        )}

        {/* Уровень */}
        <div className="avatar-level-badge">
          <span className="level-number">{character.level}</span>
        </div>
      </div>
    </div>
  )
}

export default CharacterAvatar
