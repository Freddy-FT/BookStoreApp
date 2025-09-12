import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
export function BookUpdate() {
    const { id } = useParams();
    return (
        <h1>{id}</h1>
    )}