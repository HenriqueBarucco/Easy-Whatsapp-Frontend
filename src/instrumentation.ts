import { registerOTel, OTLPHttpJsonTraceExporter } from '@vercel/otel';

import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

const diagLoggerFlag = Symbol.for('easy-whatsapp-frontend.otel-diag-logger');

export async function register() {
    const globalState = globalThis as Record<string | symbol, unknown>;
    const runtime = process.env.NEXT_RUNTIME === 'edge' ? 'edge' : 'nodejs';
    const instrumentationFlag = Symbol.for(
        `easy-whatsapp-frontend.instrumentation-registered.${runtime}`,
    );

    if (globalState[instrumentationFlag]) {
        return;
    }

    globalState[instrumentationFlag] = true;

    try {
        if (!globalState[diagLoggerFlag]) {
            diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);
            globalState[diagLoggerFlag] = true;
        }

        const traceExporterUrl = process.env.OTEL_TRACE_EXPORTER_URL;

        const deploymentEnvironment =
      process.env.DEPLOYMENT_ENVIRONMENT ??
      (process.env.NODE_ENV === 'production' ? 'production' : 'stage');

        registerOTel({
            serviceName: 'easy-whatsapp-frontend',
            traceExporter: new OTLPHttpJsonTraceExporter({
                url: traceExporterUrl,
            }),
            attributes: {
                'deployment.environment': deploymentEnvironment,
            },
        });
    } catch (error) {
        if (
            error instanceof Error &&
      error.message.includes('Attempted duplicate registration of API')
        ) {
            return;
        }

        Reflect.deleteProperty(globalState, instrumentationFlag);
        throw error;
    }
}
