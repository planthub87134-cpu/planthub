import React, { useState, useRef } from 'react';
import { Upload, Activity, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Leaf, Droplets, Sun, Bug } from 'lucide-react';
import { Link } from 'react-router';

export default function PlantDoctorPage() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [appState, setAppState] = useState('IDLE'); // IDLE, SCANNING, RESULT
  const fileInputRef = useRef(null);

  const MOCK_DIAGNOSES = [
    {
      condition: "Root Rot & Overwatering",
      confidence: "94%",
      severity: "High",
      symptoms: ["Yellowing leaves", "Wilting despite wet soil", "Mushy stems"],
      causes: "Soil is too dense or lacks drainage, leading to oxygen deprivation at the roots.",
      solution: [
        "Stop watering immediately and let the top 2-3 inches of soil dry out.",
        "Ensure the pot has drainage holes. If not, repot the plant.",
        "If severe, remove the plant from the pot, trim away mushy black roots, and repot in fresh, well-draining soil."
      ],
      icon: <Droplets size={24} className="text-info-500" />
    },
    {
      condition: "Sunburn / Light Scorch",
      confidence: "88%",
      severity: "Medium",
      symptoms: ["Crispy brown leaf edges", "Bleached or pale spots on leaves"],
      causes: "Plant was exposed to direct, intense sunlight that it is not adapted to.",
      solution: [
        "Move the plant a few feet away from the window or use a sheer curtain to diffuse the light.",
        "Do not remove damaged leaves until new growth appears, unless they are completely dead.",
        "Maintain normal watering schedule."
      ],
      icon: <Sun size={24} className="text-warning-500" />
    },
    {
      condition: "Spider Mites Infestation",
      confidence: "91%",
      severity: "High",
      symptoms: ["Tiny webbing between leaves", "Speckled or stippled leaf surface", "Leaves dropping"],
      causes: "Dry indoor air and lack of humidity creates a perfect breeding ground for spider mites.",
      solution: [
        "Isolate the plant immediately to prevent spreading to other plants.",
        "Wipe leaves down with a damp cloth or take the plant to the shower to wash off the mites.",
        "Treat with Neem Oil or insecticidal soap every 7 days until clear.",
        "Increase humidity around the plant."
      ],
      icon: <Bug size={24} className="text-danger-500" />
    }
  ];

  const [diagnosis, setDiagnosis] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (selectedFile) => {
    // Basic validation
    if (!selectedFile.type.match('image.*')) {
      alert('Please upload an image file (JPG, PNG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setFile(e.target.result);
      startScan();
    };
    reader.readAsDataURL(selectedFile);
  };

  const startScan = () => {
    setAppState('SCANNING');
    
    // Simulate AI scanning delay
    setTimeout(() => {
      // Pick a random diagnosis for the demo
      const randomDiagnosis = MOCK_DIAGNOSES[Math.floor(Math.random() * MOCK_DIAGNOSES.length)];
      setDiagnosis(randomDiagnosis);
      setAppState('RESULT');
    }, 3500); // 3.5 seconds of scanning animation
  };

  const resetScanner = () => {
    setFile(null);
    setDiagnosis(null);
    setAppState('IDLE');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="page-enter">
      <div style={{ background: 'linear-gradient(135deg, var(--primary-900), var(--primary-700))', color: 'white', padding: 'var(--space-12) 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', marginBottom: 'var(--space-4)' }}>
            <Activity size={40} color="white" />
          </div>
          <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>AI Plant Doctor 🩺</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--primary-100)', lineHeight: '1.6' }}>
            Is your plant looking sad? Upload a photo of the sick leaves or stem, and our AI will instantly diagnose the problem and provide a treatment plan.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 10, paddingBottom: 'var(--space-16)' }}>
        <div className="card" style={{ maxWidth: '900px', margin: '0 auto', padding: 'var(--space-8)', boxShadow: 'var(--shadow-2xl)', borderRadius: 'var(--radius-2xl)' }}>
          
          {/* STATE: IDLE (Upload UI) */}
          {appState === 'IDLE' && (
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{ 
                border: `3px dashed ${isDragging ? 'var(--primary-500)' : 'var(--border-light)'}`,
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-12) var(--space-4)',
                textAlign: 'center',
                backgroundColor: isDragging ? 'var(--primary-50)' : 'var(--bg-secondary)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => fileInputRef.current.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileInput} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
              <Upload size={64} style={{ color: isDragging ? 'var(--primary-500)' : 'var(--text-muted)', margin: '0 auto var(--space-4)' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>
                {isDragging ? 'Drop your photo here!' : 'Click or Drag & Drop a photo'}
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>Supports JPG, PNG (Max 5MB)</p>
              <button className="btn btn-primary" style={{ marginTop: 'var(--space-6)' }}>Browse Files</button>
            </div>
          )}

          {/* STATE: SCANNING */}
          {appState === 'SCANNING' && (
            <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
              <div style={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto var(--space-8)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                <img src={file} alt="Plant to analyze" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {/* Scanning Laser Animation */}
                <div style={{ 
                  position: 'absolute', 
                  top: 0, left: 0, right: 0, 
                  height: '4px', 
                  backgroundColor: 'var(--primary-400)', 
                  boxShadow: '0 0 15px 5px rgba(16,185,129,0.5)',
                  animation: 'scan-laser 2s infinite linear' 
                }} />
                {/* Scanning overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(16,185,129,0.2) 0%, transparent 100%)',
                  animation: 'scan-bg 2s infinite linear'
                }} />
              </div>
              <div className="spinner spinner-lg" style={{ borderColor: 'var(--primary-200)', borderTopColor: 'var(--primary-500)', marginBottom: 'var(--space-4)' }}></div>
              <h2 style={{ color: 'var(--primary-600)', marginBottom: 'var(--space-2)' }}>Analyzing Plant Health...</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Identifying symptoms, checking for pests, and analyzing leaf patterns.</p>
              
              <style>{`
                @keyframes scan-laser {
                  0% { top: 0%; }
                  50% { top: 100%; }
                  100% { top: 0%; }
                }
                @keyframes scan-bg {
                  0% { background-position: 0 -300px; }
                  100% { background-position: 0 300px; }
                }
              `}</style>
            </div>
          )}

          {/* STATE: RESULT */}
          {appState === 'RESULT' && diagnosis && (
            <div className="animate-slide-up">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                    <img src={file} alt="Scanned Plant" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {diagnosis.icon}
                      Diagnosis Complete
                    </h2>
                    <p style={{ color: 'var(--text-muted)' }}>AI Confidence Score: <strong style={{ color: 'var(--success-500)' }}>{diagnosis.confidence}</strong></p>
                  </div>
                </div>
                <button onClick={resetScanner} className="btn btn-outline">
                  <RefreshCw size={18} /> Scan Another
                </button>
              </div>

              <div className="grid grid-2" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
                <div style={{ background: 'var(--danger-50)', border: '1px solid var(--danger-200)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)' }}>
                  <h3 style={{ color: 'var(--danger-700)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertTriangle size={20} />
                    The Problem
                  </h3>
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>Condition:</strong>
                    <span style={{ fontSize: '1.2rem', color: 'var(--danger-600)', fontWeight: 'bold' }}>{diagnosis.condition}</span>
                  </div>
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>Severity:</strong>
                    <span className="badge badge-solid-danger">{diagnosis.severity}</span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>Root Cause:</strong>
                    <p style={{ color: 'var(--text-secondary)' }}>{diagnosis.causes}</p>
                  </div>
                </div>

                <div style={{ background: 'var(--success-50)', border: '1px solid var(--success-200)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)' }}>
                  <h3 style={{ color: 'var(--success-700)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={20} />
                    Treatment Plan
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {diagnosis.solution.map((step, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ background: 'var(--success-500)', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', flexShrink: 0 }}>
                          {idx + 1}
                        </span>
                        <span style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
                <h3 style={{ marginBottom: 'var(--space-2)' }}>Need more help?</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Our plant experts are available on WhatsApp to guide you through the recovery process.</p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                  <Link to="/contact" className="btn btn-secondary">Contact Support</Link>
                  <Link to="/shop" className="btn btn-primary">
                    Shop Plant Care Products <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
