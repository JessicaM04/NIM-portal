import React from 'react';

const SingleComment = props => {
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            Username
          </span>{' '}
          comment on createdAt
        </p>
        <div className="card-body">
          <p>Comment Text</p>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
