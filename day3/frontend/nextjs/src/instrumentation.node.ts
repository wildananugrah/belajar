import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { jaegerHost } from "./configs/common.config";

function start() {
  const { endpoint, port } = PrometheusExporter.DEFAULT_OPTIONS;
  const metricExporter = new PrometheusExporter(
    {
      port: 9464,
    },
    () => {
      console.log(
        `prometheus scrape endpoint: http://prometheus:${port}${endpoint}`
      );
    }
  );

  const traceExporter = new OTLPTraceExporter({
    url: jaegerHost,
  });

  const sdk = new NodeSDK({
    traceExporter,
    serviceName: "nextjs-app",
    metricReader: metricExporter,
    instrumentations: [getNodeAutoInstrumentations()],
  });

  sdk.start();
}

export default start;
