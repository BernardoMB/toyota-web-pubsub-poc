// See https://aka.ms/new-console-template for more information
using Azure.Core;
using Azure.Messaging.WebPubSub;

Console.WriteLine("Hello, World!");

string connectionString = "Endpoint=https://toyota-poc.webpubsub.azure.com;AccessKey=SqsORyf4zbJGA9YXpotjYVYqtzcnvArTl9OMICpKcNw=;Version=1.0;";
string hubName = "PricingHub";
WebPubSubServiceClient serviceClient = new WebPubSubServiceClient(connectionString, hubName);

int index = 1;
while (true)
{
    Console.WriteLine($"Seding message {index}");
    var random = new Random();
    var lowerBound = 15;
    var upperBound = 40;
    var rNum = random.Next(lowerBound, upperBound);
    serviceClient.SendToAll(RequestContent.Create(new
    {
        Message = $"New measurement {index++}",
        Measurement = rNum
    }),
    ContentType.ApplicationJson
    );
    Thread.Sleep(1500);
}