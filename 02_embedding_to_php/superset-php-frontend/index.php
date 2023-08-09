

<html>
<head>
<style>
div > iframe{
  
  overflow: hidden;
  border: 0;
  height: 50%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

}
</style>
<script src="https://unpkg.com/@superset-ui/embedded-sdk"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
</head>
<body>

<div>
<div id="dash"/> 
</div>
<script>
   
   supersetEmbeddedSdk.embedDashboard({
        id: "af2ec01e-a768-4d7f-9eb2-e0861d603e51", // given by the Superset embedding UI
        supersetDomain: "http://localhost:8088",
        mountPoint: document.getElementById("dash"), // html element in which iframe render
        fetchGuestToken: () => getToken(),
        dashboardUiConfig: {
          hideTitle: true,
          hideChartControls: false,
          hideTab: false,
        },
  });

function getToken() {

$.ajax({
  url: 'http://localhost:3001/gues-token',
  type: 'GET',
  async : true,

  cache: true,
  error: function() {
    console.log('Failure in Authentication');
  },
  success: function(response) {
    result = response;
    console.log(result);
    return result;

  }
});
}
</script>



<duv>
<iframe
      width=100%
      height=50%
      frameBorder="0"
      src="http://localhost:8088/superset/dashboard/2/?standalone=true"
    >
    </iframe>
</div>
</body>
<script>

</script>
</html>

