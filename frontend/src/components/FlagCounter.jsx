const FlagCounter = () => {
  return (
    <div 
      className="flag-counter-container"
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        padding: '20px 0',
        width: '100%'
      }}
    >
      <a 
        href="https://info.flagcounter.com/Xw4s" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <img 
          src="https://s01.flagcounter.com/count2/Xw4s/bg_364878/txt_D5D7DB/border_CCCCCC/columns_2/maxflags_6/viewers_Pengunjung/labels_0/pageviews_0/flags_0/percent_0/" 
          alt="Flag Counter" 
          style={{ border: 0, display: 'block' }}
        />
      </a>
    </div>
  );
};

export default FlagCounter;