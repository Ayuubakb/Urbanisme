import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DocumentPage.css';

const DocumentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [documents, setDocuments] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8092/userSpace/get_document/${id}`);
                const allDocs = response.data;
                
                const documentUrls = {};
                
                Object.entries(allDocs).forEach(([key, base64Data]) => {
                    if (base64Data) {
                        // Convert Base64 to Blob using native browser APIs
                        const binaryString = atob(base64Data);
                        const bytes = new Uint8Array(binaryString.length);
                        for (let i = 0; i < binaryString.length; i++) {
                            bytes[i] = binaryString.charCodeAt(i);
                        }
                        const blob = new Blob([bytes], { type: 'application/pdf' });
                        const url = URL.createObjectURL(blob);
                        documentUrls[key] = url;
                    }
                });

                setDocuments(documentUrls);
                setError(null);
            } catch (err) {
                setError('Failed to fetch documents. Please try again later.');
                console.error('Error fetching documents:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();

        return () => {
            Object.values(documents).forEach(url => {
                if (url) URL.revokeObjectURL(url);
            });
        };
    }, [id]);

    const documentTitles = {
        attestaion_inscription_taxe: "Attestation d'inscription taxe",
        certificat_negatif: "Certificat négatif",
        cin_representant: "CIN représentant",
        declaration_immatriculation: "Déclaration d'immatriculation",
        procuration: "Procuration",
        procureur_cin: "CIN procureur",
        prove_domicile: "Preuve de domicile"
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading">Loading documents...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error">{error}</div>
                <button onClick={() => navigate('/user/profile')} className="back-btn">
                    ← Back
                </button>
            </div>
        );
    }

    return (
        <div className="documents-container">
            <button onClick={() => navigate('/user/profile')} className="back-btn">
                ← Back
            </button>
            <h1>Documents</h1>
            <div className="documents-grid">
                {Object.entries(documents).map(([key, url]) => (
                    <div key={key} className="document-card">
                        <h3>{documentTitles[key] || key}</h3>
                        {url && (
                            <>
                                <iframe
                                    src={url}
                                    className="pdf-viewer"
                                    title={documentTitles[key]}
                                />
                                <a 
                                    href={url} 
                                    download={`${documentTitles[key]}.pdf`}
                                    className="download-btn"
                                >
                                    Download PDF
                                </a>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DocumentPage;