import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap/';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';

const Comment = () => {
    return (
        <div className="comment">
            <div className="comment-content">
                <p>This is a comment</p>
            </div>
            <div className="comment-actions">
                <Dropdown>
                    <DropdownToggle className="btn btn-link">
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <FontAwesomeIcon icon={faTrashAlt} /> Delete
                        </DropdownItem>
                        <DropdownItem>
                            <FontAwesomeIcon icon={faEdit} /> Edit
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
};

export default Comment;
