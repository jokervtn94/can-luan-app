
import React, { useState } from 'react';

const hanh = {
  Giáp: 'Mộc', Ất: 'Mộc',
  Bính: 'Hỏa', Đinh: 'Hỏa',
  Mậu: 'Thổ', Kỷ: 'Thổ',
  Canh: 'Kim', Tân: 'Kim',
  Nhâm: 'Thủy', Quý: 'Thủy'
};

const sinh = {
  Mộc: 'Hỏa', Hỏa: 'Thổ', Thổ: 'Kim', Kim: 'Thủy', Thủy: 'Mộc'
};

const khac = {
  Mộc: 'Thổ', Thổ: 'Thủy', Thủy: 'Hỏa', Hỏa: 'Kim', Kim: 'Mộc'
};

const getRelation = (nhatCan, otherCan) => {
  const nhatHanh = hanh[nhatCan];
  const otherHanh = hanh[otherCan];
  if (sinh[nhatHanh] === otherHanh) return 'Sinh xuất (mình sinh nó)';
  if (sinh[otherHanh] === nhatHanh) return 'Được sinh (nó sinh mình)';
  if (khac[nhatHanh] === otherHanh) return 'Khắc xuất (mình khắc nó)';
  if (khac[otherHanh] === nhatHanh) return 'Bị khắc (nó khắc mình)';
  return 'Tỷ Kiên (đồng hành)';
};

export default function CanLuanApp() {
  const [nhatCan, setNhatCan] = useState('');
  const [others, setOthers] = useState(['', '', '']);
  const [results, setResults] = useState([]);

  const handleCalculate = () => {
    const res = others.map((can) => ({
      can,
      hanh: hanh[can],
      relation: getRelation(nhatCan, can),
    }));
    setResults(res);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Luận Thiên Can theo Nhật chủ</h2>
      <div>
        <label>Nhật Can:</label>
        <input value={nhatCan} onChange={(e) => setNhatCan(e.target.value)} placeholder="VD: Tân" />
      </div>
      <div>
        <label>Các Can còn lại (Năm, Tháng, Giờ):</label>
        {others.map((can, idx) => (
          <input
            key={idx}
            value={can}
            onChange={(e) => {
              const newOthers = [...others];
              newOthers[idx] = e.target.value;
              setOthers(newOthers);
            }}
            placeholder={`Can ${idx + 1}`}
          />
        ))}
      </div>
      <button onClick={handleCalculate}>Luận Can</button>
      <hr />
      {results.map((r, idx) => (
        <div key={idx}>
          <p><strong>Can:</strong> {r.can}</p>
          <p><strong>Ngũ hành:</strong> {r.hanh}</p>
          <p><strong>Quan hệ:</strong> {r.relation}</p>
        </div>
      ))}
    </div>
  );
}
