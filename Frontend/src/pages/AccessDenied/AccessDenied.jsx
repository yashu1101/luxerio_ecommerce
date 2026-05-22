import React from 'react';

export const AccessDenied = () => {
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            overflow: 'hidden',
        },
        contentWrapper: {
            textAlign: 'center',
            padding: '20px',
            maxWidth: '500px',
            animation: 'slideIn 0.6s ease-out',
        },
        lockIcon: {
            fontSize: '80px',
            marginBottom: '20px',
            animation: 'bounce 2s infinite',
        },
        heading: {
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'var(--primary-color)',
            marginBottom: '10px',
            animation: 'fadeIn 1s ease-out',
        },
        subheading: {
            fontSize: '24px',
            color: '#000000',
            marginBottom: '20px',
            animation: 'fadeIn 1.2s ease-out',
        },
        message: {
            fontSize: '16px',
            color: 'gray',
            marginBottom: '30px',
            lineHeight: '1.6',
            animation: 'fadeIn 1.4s ease-out',
        },
        button: {
            padding: '12px 30px',
            fontSize: '16px',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            animation: 'slideUp 0.6s ease-out',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            },
        },
        styleSheet: `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            @keyframes bounce {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-20px);
                }
            }
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            button:hover {
                transform: translateY(-2px) !important;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
            }
        `,
    };

    const handleGoHome = () => {
        window.location.href = '/';
    };

    return (
        <>
            <style>{styles.styleSheet}</style>
            <div style={styles.container}>
                <div style={styles.contentWrapper}>
                    <div style={styles.lockIcon}>🔒</div>
                    <h1 style={styles.heading}>Access Denied</h1>
                    <h2 style={styles.subheading}>403 Forbidden</h2>
                    <p style={styles.message}>
                        You don't have permission to access this resource. 
                        Please contact the administrator if you believe this is a mistake.
                    </p>
                    <button style={styles.button} onClick={handleGoHome}>
                        Go to Home
                    </button>
                </div>
            </div>
        </>
    );
};

