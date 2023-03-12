import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

// import { Capitalize1stLetter } from 'utils/helpers';
const Capitalize1stLetter = (value: string) => value;

export type breadcrumbDataType = {
    text: string;
    active?: boolean;
    path?: string;
};

type Props = {
    data: breadcrumbDataType[];
};

const BreadCrumbs: React.FC<Props> = ({ data }: Props) => {
    return (
        <Breadcrumb className="mt-3">
            {data.map((d: breadcrumbDataType, i: number) =>
                d.path ? (
                    <Breadcrumb.Item key={i} linkAs={Link} linkProps={{ to: d.path }}>
                        {Capitalize1stLetter(d.text)}
                    </Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item key={i} active={d.active}>
                        {Capitalize1stLetter(d.text)}
                    </Breadcrumb.Item>
                ),
            )}
        </Breadcrumb>
    );
};

export default BreadCrumbs;
