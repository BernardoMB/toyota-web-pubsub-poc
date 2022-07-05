using Azure.Messaging.WebPubSub;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ToyoteWebPubSub.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WebPubSubController : ControllerBase
    {
        [EnableCors("AllowOrigin")]
        [HttpGet]
        public IActionResult Get()
        {
            string connectionString = "Endpoint=https://toyota-poc.webpubsub.azure.com;AccessKey=SqsORyf4zbJGA9YXpotjYVYqtzcnvArTl9OMICpKcNw=;Version=1.0;";
            string hubName = "PricingHub";
            WebPubSubServiceClient serviceClient = new WebPubSubServiceClient(connectionString, hubName);
            Uri uri = serviceClient.GetClientAccessUri(TimeSpan.FromSeconds(1 * 60 * 60));
            return Ok(new { uri = uri });
        }
    }
}