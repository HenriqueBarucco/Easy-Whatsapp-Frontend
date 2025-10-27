import { registerOTel, OTLPHttpJsonTraceExporter } from '@vercel/otel';

import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

export function register() {
    const traceExporterUrl = process.env.OTEL_TRACE_EXPORTER_URL;

    const deploymentEnvironment = process.env.ENV === 'production' ? 'production' : 'stage';

    registerOTel({
        serviceName: 'easy-whatsapp-frontend',
        traceExporter: new OTLPHttpJsonTraceExporter({
            url: traceExporterUrl,
        }),
        attributes: {
            'deployment.environment': deploymentEnvironment,
        },
    });
}