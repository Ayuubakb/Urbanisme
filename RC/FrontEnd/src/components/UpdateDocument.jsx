import { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateDocument.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function UpdateDocument({ id, isProcuration }) {
    const [documents, setDocuments] = useState({});
    const [newDocuments, setNewDocuments] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [originalDocuments, setOriginalDocuments] = useState({});

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    const documentTitles = {
        attestaion_inscription_taxe: "Attestation d'inscription taxe",
        certificat_negatif: "Certificat négatif",
        cin_representant: "CIN représentant",
        declaration_immatriculation: "Déclaration d'immatriculation",
        prove_domicile: "Preuve de domicile",
        ...(isProcuration ? {
            procuration: "Procuration",
            procureur_cin: "CIN procureur"
        } : {})
    };

    const requiredDocuments = [
        'cin_representant',
        'declaration_immatriculation',
        'attestaion_inscription_taxe',
        'prove_domicile',
        'certificat_negatif'
    ];

    useEffect(() => {
        fetchDocuments();
        if (!isProcuration) {
            setDocuments(prev => {
                const newDocs = { ...prev };
                delete newDocs.procuration;
                delete newDocs.procureur_cin;
                return newDocs;
            });
            setNewDocuments(prev => {
                const newDocs = { ...prev };
                delete newDocs.procuration;
                delete newDocs.procureur_cin;
                return newDocs;
            });
            setOriginalDocuments(prev => {
                const newDocs = { ...prev };
                delete newDocs.procuration;
                delete newDocs.procureur_cin;
                return newDocs;
            });
        }
        return () => {
            Object.values(documents).forEach(url => {
                if (url) URL.revokeObjectURL(url);
            });
        };
    }, [id, isProcuration]);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8092/userSpace/get_document/${id}`);
            const allDocs = response.data;
            setOriginalDocuments(allDocs);
            
            const documentUrls = {};
            Object.entries(allDocs).forEach(([key, base64Data]) => {
                if (base64Data) {
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
        } catch (err) {
            setError('Failed to fetch documents: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const validateFile = (file) => {
        if (!file.type.includes('pdf')) {
            throw new Error('Only PDF files are allowed');
        }
        if (file.size > MAX_FILE_SIZE) {
            throw new Error('File size should not exceed 5MB');
        }
    };

    const handleFileChange = (e, docType) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            validateFile(file);
            setNewDocuments(prev => ({
                ...prev,
                [docType]: file
            }));
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUploadAll = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
                
            // Handle required documents
            requiredDocuments.forEach(doc => {
                if (newDocuments[doc]) {
                    // If there's a new document, use it
                    formData.append(doc, newDocuments[doc]);
                } else if (originalDocuments[doc]) {
                    // If there's an existing document, convert it back to file
                    const binaryString = atob(originalDocuments[doc]);
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    const blob = new Blob([bytes], { type: 'application/pdf' });
                    const file = new File([blob], `${doc}.pdf`, { type: 'application/pdf' });
                    formData.append(doc, file);
                } else {
                    // If no document exists, append empty file
                    formData.append(doc, new File([], '', { type: 'application/pdf' }));
                }
            });
    
            // Handle procuration documents
            if (isProcuration) {
                ['procuration', 'procureur_cin'].forEach(doc => {
                    if (newDocuments[doc]) {
                        formData.append(doc, newDocuments[doc]);
                    } else if (originalDocuments[doc]) {
                        const binaryString = atob(originalDocuments[doc]);
                        const bytes = new Uint8Array(binaryString.length);
                        for (let i = 0; i < binaryString.length; i++) {
                            bytes[i] = binaryString.charCodeAt(i);
                        }
                        const blob = new Blob([bytes], { type: 'application/pdf' });
                        const file = new File([blob], `${doc}.pdf`, { type: 'application/pdf' });
                        formData.append(doc, file);
                    } else {
                        formData.append(doc, new File([], '', { type: 'application/pdf' }));
                    }
                });
            }
    
            const response = await axios.put(
                `http://localhost:8092/userSpace/update_document/${id}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    timeout: 30000
                }
            );
    
            if (response.status === 200) {
                setUploadSuccess(true);
                setNewDocuments({});
                await fetchDocuments();
                setTimeout(() => setUploadSuccess(false), 3000);
            }
        } catch (err) {
            setError(err.response?.data || 'Failed to upload documents');
        } finally {
            setLoading(false);
        }
    };

    const hasChanges = Object.keys(newDocuments).length > 0;

    return (
        <div className="formulaire-form documents-container">
            {error && <div className="error">{error}</div>}
            {uploadSuccess && <div className="success-message">Documents updated successfully!</div>}
            
            <div className="documents-grid">
                {Object.entries(documentTitles)
                    .filter(([key]) => !isProcuration ? 
                        key !== 'procuration' && key !== 'procureur_cin' : true)
                    .map(([key, title]) => (
                        <div key={key} className="document-card">
                            <h3>{title} {requiredDocuments.includes(key) && <span className="required">*</span>}</h3>
                            
                            {documents[key] ? (
                                <div className="preview-section">
                                    <iframe
                                        src={documents[key]}
                                        className="pdf-viewer"
                                        title={title}
                                        style={{ width: '100%', height: '200px', border: 'none' }}
                                    />
                                </div>
                            ) : (
                                <div className="preview-section">
                                    <p className="no-document">No document uploaded</p>
                                </div>
                            )}
                            
                            <div className="upload-section">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => handleFileChange(e, key)}
                                    id={`file-${key}`}
                                    className="file-input"
                                    disabled={loading}
                                />
                                <label htmlFor={`file-${key}`} className="file-label">
                                    {newDocuments[key]?.name || (documents[key] ? 'Change Document' : 'Choose Document')}
                                </label>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="form-actions">
                <button 
                    className="submit-btn"
                    onClick={handleUploadAll}
                    disabled={!hasChanges || loading}
                >
                    {loading ? 'Uploading...' : 'Update All Documents'}
                </button>
            </div>
        </div>
    );
}

UpdateDocument.propTypes = {
    id: PropTypes.string.isRequired,
    isProcuration: PropTypes.bool.isRequired
};

export default UpdateDocument;