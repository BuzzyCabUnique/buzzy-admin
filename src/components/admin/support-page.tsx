'use client';

import { useMemo, useState } from 'react';
import { MessageSquareReply, SendHorizonal } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/admin/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAdminStore } from '@/store/admin-store';
import { TicketStatus } from '@/types';

const statusVariants = {
  Open: 'info',
  Investigating: 'warning',
  Resolved: 'success',
} as const;

const priorityVariants = {
  Low: 'default',
  Medium: 'warning',
  High: 'danger',
} as const;

export function SupportPage() {
  const tickets = useAdminStore((state) => state.supportTickets);
  const selectedTicketId = useAdminStore((state) => state.selectedTicketId);
  const setSelectedTicket = useAdminStore((state) => state.setSelectedTicket);
  const addSupportReply = useAdminStore((state) => state.addSupportReply);
  const setTicketStatus = useAdminStore((state) => state.setTicketStatus);
  const [reply, setReply] = useState('');
  const [filter, setFilter] = useState<'All' | TicketStatus>('All');

  const filteredTickets = useMemo(() => {
    return filter === 'All' ? tickets : tickets.filter((ticket) => ticket.status === filter);
  }, [filter, tickets]);

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId) ?? filteredTickets[0];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Care"
        title="Support & Disputes"
        description="Handle payment disputes, ride issues, and driver support in a single threaded workspace."
      />

      <div className="flex flex-wrap gap-2">
        {(['All', 'Open', 'Investigating', 'Resolved'] as const).map((status) => (
          <Button key={status} size="sm" variant={filter === status ? 'default' : 'outline'} onClick={() => setFilter(status)}>
            {status}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.35fr]">
        <Card>
          <CardHeader>
            <CardTitle>Ticket queue</CardTitle>
            <CardDescription>Prioritized by customer impact and active investigation state.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredTickets.map((ticket) => (
              <button
                key={ticket.id}
                type="button"
                onClick={() => setSelectedTicket(ticket.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selectedTicket?.id === ticket.id
                    ? 'border-[#FFD400]/45 bg-[#FFF8D6] dark:bg-[#2A2616]'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{ticket.subject}</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{ticket.customerName}</p>
                  </div>
                  <Badge variant={priorityVariants[ticket.priority]}>{ticket.priority}</Badge>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant={statusVariants[ticket.status]}>{ticket.status}</Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{ticket.openedAt}</span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <CardTitle>{selectedTicket?.subject ?? 'Select a ticket'}</CardTitle>
              <CardDescription>
                {selectedTicket ? `${selectedTicket.customerName} • ${selectedTicket.category}` : 'No ticket selected'}
              </CardDescription>
            </div>
            {selectedTicket ? <Badge variant={statusVariants[selectedTicket.status]}>{selectedTicket.status}</Badge> : null}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-[#2A2A2D]">
              <div className="flex flex-wrap gap-2">
                {(['Open', 'Investigating', 'Resolved'] as const).map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={selectedTicket?.status === status ? 'default' : 'outline'}
                    onClick={() => {
                      if (!selectedTicket) return;
                      setTicketStatus(selectedTicket.id, status);
                      toast.success(`Ticket marked ${status.toLowerCase()}`);
                    }}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3 rounded-3xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-[#2A2A2D]">
              {selectedTicket?.messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'Admin' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                      message.sender === 'Admin'
                        ? 'bg-[linear-gradient(135deg,#FFD400_0%,#FF9F0A_100%)] text-[#0D0D0D]'
                        : 'bg-gray-100 text-gray-900 dark:bg-[#323236] dark:text-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs opacity-80">
                      <span>{message.sender}</span>
                      <span>{message.timestamp}</span>
                    </div>
                    <p className="mt-1 leading-6">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Textarea
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                placeholder="Write an internal note or customer-facing reply..."
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Button variant="outline" onClick={() => setReply('Refund approved. Reversing cancellation fee and closing loop with rider today.') }>
                  <MessageSquareReply className="h-4 w-4" />
                  Use saved reply
                </Button>
                <Button
                  onClick={() => {
                    if (!selectedTicket || !reply.trim()) {
                      toast.error('Enter a reply first');
                      return;
                    }
                    addSupportReply(selectedTicket.id, reply.trim());
                    setReply('');
                    toast.success('Reply sent to ticket thread');
                  }}
                >
                  <SendHorizonal className="h-4 w-4" />
                  Send reply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
