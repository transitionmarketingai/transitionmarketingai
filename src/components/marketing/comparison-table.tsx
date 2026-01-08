
import { CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ComparisonTable() {
    return (
        <section id="problem" className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Most Lead Generation Agencies Are Broken</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Stop paying for "activity" and start paying for verified results.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Old Way */}
                    <Card className="border-red-200 bg-red-50/10">
                        <CardHeader>
                            <CardTitle className="text-2xl text-red-600">The Old Way</CardTitle>
                            <CardDescription>Traditional Agencies & Freelancers</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <XCircle className="h-6 w-6 text-red-500 mr-3 shrink-0" />
                                    <span>Charge high retainers ($2k+) with no guarantee</span>
                                </li>
                                <li className="flex items-start">
                                    <XCircle className="h-6 w-6 text-red-500 mr-3 shrink-0" />
                                    <span>Send you "leads" that are just clicks/emails</span>
                                </li>
                                <li className="flex items-start">
                                    <XCircle className="h-6 w-6 text-red-500 mr-3 shrink-0" />
                                    <span>Manual follow-up required by YOU</span>
                                </li>
                                <li className="flex items-start">
                                    <XCircle className="h-6 w-6 text-red-500 mr-3 shrink-0" />
                                    <span>Slow experiments (3-6 months to see ROI)</span>
                                </li>
                                <li className="flex items-start">
                                    <XCircle className="h-6 w-6 text-red-500 mr-3 shrink-0" />
                                    <span>Excuses about "brand awareness" when ads fail</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* New Way */}
                    <Card className="border-primary bg-primary/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold rounded-bl-lg">
                            RECOMMENDED
                        </div>
                        <CardHeader>
                            <CardTitle className="text-2xl text-primary">The Verified Way</CardTitle>
                            <CardDescription>Transition Marketing AI</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                                    <span><strong>Performance First:</strong> Verified Inquiries or we work for free</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                                    <span><strong>Verified Intent:</strong> We speak to them before you do</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                                    <span><strong>Ready to Talk:</strong> Prospects expecting your call</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                                    <span><strong>Fast Launch:</strong> Campaigns live in < 7 days</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                                    <span><strong>Transparent Tracking:</strong> Real-time dashboard access</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
