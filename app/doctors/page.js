"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import DoctorCard from '../../components/DoctorCard';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [searchHospital, setSearchHospital] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchDoctors();
    fetchCurrentUser();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await fetch('/api/doctors');
      const data = await res.json();
      setDoctors(data);
      setFilteredDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setCurrentUser(data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleSearch = () => {
    let filtered = doctors;

    if (searchName) {
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchSpecialty) {
      filtered = filtered.filter(d => 
        d.specialization.toLowerCase().includes(searchSpecialty.toLowerCase())
      );
    }

    if (searchHospital) {
      filtered = filtered.filter(d => 
        d.hospital.toLowerCase().includes(searchHospital.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  };

  if (loading) {
    return (
      <div className="page">
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔄</div>
          <p>Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem', width:'100%' }}>Find Doctors</h1>
          
        </div>
      </div>

      <div style={{ Width: '100%', margin: '0 auto 2rem', padding: '0 1rem' }}>
        <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Doctor Name</label>
              <input
                type="text"
                placeholder="Dr. Smith"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Specialization</label>
              <input
                type="text"
                placeholder="Cardiology"
                value={searchSpecialty}
                onChange={(e) => setSearchSpecialty(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Hospital</label>
              <input
                type="text"
                placeholder="Apollo"
                value={searchHospital}
                onChange={(e) => setSearchHospital(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}
              />
            </div>
            <button 
            className="btn" 
            onClick={handleSearch}
            style={{ 
              marginTop: '1rem', 
              background: '#1565c0', 
              color: 'white', 
              border: 'none', 
              padding: '0.75rem 2rem', 
              borderRadius: '0.5rem', 
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🔍 Search Doctors
          </button>
          </div>
          
        </div>
      </div>

      <div style={{ padding: '0 1rem' }}>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
          Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
        </p>
        <div className="grid">
          {filteredDoctors.map((doctor) => (
            <DoctorCard 
              key={doctor._id} 
              doctor={doctor} 
              userName={currentUser?.name || 'yourself'} 
            />
          ))}
        </div>
        {filteredDoctors.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#666' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3>No doctors found</h3>
            <p>Try different search terms or clear filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
