import React, { useMemo } from 'react';

const Avatar = ({ seed, size = 150 }) => {
    const avatarUrl = useMemo(() => {
        // Using DiceBear pixel-art collection
        // We append a random-ish seed or level number
        return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
    }, [seed]);

    return (
        <div className="boss-image">
            <img
                src={avatarUrl}
                alt="Boss Avatar"
                style={{ width: '100%', height: '100%', imageRendering: 'pixelated' }}
            />
        </div>
    );
};

export default Avatar;
