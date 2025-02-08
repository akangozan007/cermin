import React from 'react';

function Footer() {
  return (
<footer className='bg-dark'>
    <div className="card text-center bg-dark">
    <div className="card-header bg-warning">
        <h2 className='text-start'>Media Objek</h2>
    </div>
    <div class="row justify-content-evenly">
        <div className="card-body col-6">
        <h3 className="card-title text-start text-primary fw-bolder">Substansi Atas</h3>
            <div className='container  d-inline-flex gap-3 p-4 flex-wrap'>
                <button className='btn btn-outline-light'>Vacuum<br/>n=1.0</button>
                <button className='btn btn-outline-light'>Air <br/>n=1.003</button>
                <button className='btn btn-primary'>Water<br/>n=1.33</button>
                <button className='btn btn-warning'>Oil<br/>n=1.47</button>
            </div>
        </div>
        <div className="card-body col-6">
        <h3 className="card-title text-start text-primary fw-bolder">Substansi Bawah</h3>
            <div className='container  d-inline-flex gap-3 p-4 flex-wrap'>
                <button className='btn btn-outline-light'>Vacuum<br/>n=1.0</button>
                <button className='btn btn-outline-light'>Air <br/>n=1.003</button>
                <button className='btn btn-primary'>Water<br/>n=1.33</button>
                <button className='btn btn-warning'>Oil<br/>n=1.47</button>
            </div>
        </div>
    </div>
    <div className="card-footer text-body-secondary">
      Tugas Akhir Prodi Fisika
    </div>
  </div>
</footer>
  )
}

export default Footer;
